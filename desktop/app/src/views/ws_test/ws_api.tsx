import { Tabs } from 'antd'
import { dlog } from 'corexxx'
import React, { useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import WebSocket from 'ws'
import './ws_test.less'

type TResult = { icon: string; text: string; details: string; color: string }

const WSTest: React.FC<PageProps> = () => {
  dlog.d('rendered')
  let ws = React.useRef<WebSocket | null>()
  let [code, setCode] = useState('')
  let [connected, setConnected] = useState(false)
  let [url, setUrl] = useState('')
  let [data, setData] = useState('')
  let result = useArray<TResult>([])
  let [loading, setLoading] = useState(false)

  return (
    <div className="ws_api flex column" style={{ height: '100%', padding: 10 }}>
      <Tabs defaultActiveKey="1" style={{ flex: 1 }}>
        <Tabs.TabPane tab="Formatted Test" key="1">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Raw Test" key="2" style={{ flex: 1, height: '100%' }}>
          <MonacoEditor
            language="javascript"
            theme="vs-light"
            height="100%"
            width="100%"
            value={code}
            options={{ selectOnLineNumbers: true, minimap: { enabled: false } }}
            onChange={(x) => setCode(x)}
            editorDidMount={() => {}}
          />
        </Tabs.TabPane>
      </Tabs>
      {/*

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
                    result.push({
                      icon: 'checkbox-circle',
                      text: `connected to ${url}`,
                      details: '',
                      color: 'green',
                    })
                    setConnected(true)
                  })
                  ws.current?.on('connection', function connect(ws, data) {
                    result.push({
                      icon: 'check',
                      text: `attached connection ${url}`,
                      details: '',
                      color: dcolors.pallets.amber300,
                    })
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
                  ws.current?.on('message', (data: any, args: any) => {
                    result.push({
                      icon: 'arrow-down',
                      text: `${data}`,
                      details: '',
                      color: dcolors.pallets.blue700,
                    })
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
        */}
    </div>
  )
}

// this is hack to avoid the state init
let state: any[] = []
function useArray<T>(initialState: T[]) {
  const [state1, setState] = useState<T[]>(initialState)

  function push(data: T) {
    const newstate: T[] = [data, ...state]
    state = newstate
    setState(newstate)
  }
  function reset() {
    //setState([])
  }

  return { state: state1, push: push, reset: reset }
}

export default WSTest
