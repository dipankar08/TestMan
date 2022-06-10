import { Button, Collapse, Input } from 'antd'
import { dassert, dcolors, dlog } from 'corexxx'
import React, { useState } from 'react'
import WebSocket from 'ws'
import './ws_api.less'

type TResult = { icon: string; text: string; details: string; color: string }

const WSApi: React.FC<PageProps> = () => {
  dlog.d('rendered')
  let ws = React.useRef<WebSocket | null>()
  let [method, setMethod] = useState('GET')
  let [connected, setConnected] = useState(false)
  let [url, setUrl] = useState('')
  let [data, setData] = useState('')
  let result = useArray<TResult>([])
  let [loading, setLoading] = useState(false)

  return (
    <div className="about flex column" style={{ height: '100%', padding: 10 }}>
      <div className="flex column" style={{ background: 'white', padding: 10, flex: 0, height: 200 }}>
        <div className="flex row" style={{}}>
          <Input placeholder="enter the URL" value={url} onChange={(e) => setUrl(e.target.value)}></Input>
          <Button
            loading={loading}
            type="primary"
            onClick={async () => {
              dlog.d('calling.. s ')
              if (connected) {
                ws.current?.close()
              } else {
                try {
                  ws.current = new WebSocket(url)
                  ws.current?.on('open', function open() {
                    result.push({ icon: 'checkbox-circle', text: `op to ${url}`, details: '', color: 'green' })
                    setConnected(true)
                  })
                  ws.current?.on('connect', function connect(ws, data) {
                    //result.push({ icon: 'check', text: `on called to ${url}`, details: '' })
                    //setConnected(true)
                  })
                  ws.current?.on('close', function open() {
                    result.push({
                      icon: 'checkbox-circle',
                      text: `disconnected to ${url}`,
                      details: '',
                      color: 'green',
                    })
                    setConnected(false)
                    result.reset()
                  })
                  ws.current?.on('message', (data: any) => {
                    result.push({ icon: 'arrow-down', text: `${data}`, details: '', color: 'green' })
                  })
                } catch (e) {
                  result.push({ icon: 'close-circle', text: `${e.message}`, details: '', color: 'red' })
                }
              }
            }}
          >
            {connected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
        <Input.TextArea
          style={{ marginTop: 20 }}
          placeholder="enter data to be send"
          value={data}
          onChange={(e) => setData(e.target.value)}
        ></Input.TextArea>
        <div className="flex row" style={{ marginTop: 10 }}>
          <p style={{ flex: 1 }}></p>
          <Button
            type="primary"
            onClick={async () => {
              try {
                dassert.assertNotEmpty(data, 'data is empty')
                result.push({ icon: 'arrow-up', text: `${data}`, details: '', color: dcolors.pallets.green700 })
                ws.current?.send(data, (err: Error | undefined) => {
                  if (err) {
                    // result.push({ icon: 'cross', text: `send failed ${data}`, details: '' })
                  }
                })
              } catch (e) {}
            }}
          >
            Send
          </Button>
        </div>
      </div>

      <div
        className="flex column"
        style={{ background: 'white', padding: 10, flex: 1, marginTop: 20, height: '100%', overflow: 'scroll' }}
      >
        <Collapse ghost expandIcon={() => <span />}>
          {result.state.map((x, index) => {
            return (
              <Collapse.Panel
                key={index + ''}
                header={
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid #11111111',
                      width: '100%',
                    }}
                  >
                    <span
                      className={`fs-18 ri-${x.icon}-line`}
                      style={{ marginRight: 6, color: x.color }}
                    ></span>
                    <span style={{ flex: 1 }}>{x.text}</span>
                    <span style={{ flex: 0, color: dcolors.pallets.grey400 }}>
                      {new Date().toLocaleTimeString()}
                    </span>
                  </span>
                }
                style={{ padding: 0 }}
              >
                <pre>{x.details}</pre>
              </Collapse.Panel>
            )
          })}
        </Collapse>
      </div>
    </div>
  )
}

// this is hack to avoid the state init
let state = []
function useArray<T>(initialState: T[]) {
  const [state1, setState] = useState<T[]>(initialState)

  function push(data: T) {
    let newstate: T[] = [data, ...state]
    state = newstate
    setState(newstate)
  }
  function reset() {
    //setState([])
  }

  return { state: state1, push: push, reset: reset }
}

export default WSApi
