import Adb, { Device } from '@devicefarmer/adbkit'
import Bluebird from 'bluebird'
import { dlog } from 'corexxx'
import process from 'process'
import React, { useEffect } from 'react'
import { VariableSizeList as List } from 'react-window'
const client = Adb.createClient()

// Retrieve a binary log stream

const test = async () => {}

const MainView = () => {
  console.log(process.type)
  const [ll, setll] = React.useState<string[]>([])
  useEffect(() => {
    ;(async () => {
      console.log('start')
      try {
        const tracker = await client.trackDevices()
        tracker.on('add', (device) => console.log('Device %s was plugged in', device.id))
        tracker.on('remove', (device) => console.log(device))
        tracker.on('end', () => console.log('Tracking stopped'))
      } catch (err) {
        console.error('Something went wrong:', err.stack)
      }
      client
        .listDevices()
        .then(function (devices) {
          return Bluebird.map(devices, function (device1: Device) {
            const device = client.getDevice(device1.id)
            return (
              device
                .shell('logcat') // logcat just for illustration,
                // prefer client.openLogcat in real use
                .then(function (conn) {
                  const lines: string[] = []
                  conn.on('data', function (data) {
                    // here `ps` on the device shows the running logcat process
                    lines.push(data.toString())
                    console.log(data.toString())
                    setll([...lines.reverse()])

                    // close the stream and the running process
                    // on the device will be gone, gracefully
                    //if (line > 100) conn.end()
                  })
                  conn.on('close', function () {
                    // here `ps` on the device shows the logcat process is gone
                    console.log('100 lines read already, bye')
                  })
                })
            )
          })
        })
        .then(function () {
          console.log('Done.')
        })
        .catch(function (err) {
          console.error('Something went wrong:', err.stack)
        })
    })()
  }, [])
  dlog.d('rendered')

  function Row(prop: any) {
    return <p>{ll[prop.index]}</p>
  }

  return (
    <div className="ws_api flex column" style={{ height: '100%', padding: 10 }}>
      <h1>Adb View</h1>
      <div className="list" style={{ flex: 1 }}>
        <List
          className="List"
          height={800 - 74}
          itemCount={ll.length}
          itemSize={(_index: number) => 80}
          //ref={listRef}
          width={'400'}
        >
          {Row}
        </List>
      </div>
      <p>{ll.length}</p>
    </div>
  )
}
export default MainView
