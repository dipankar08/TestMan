// @ts-nocheck
import { Button, Collapse, Input, Radio, Select, Tabs } from 'antd'
import { dassert, dcolors, dlog, dnetwork } from 'corexxx'
import React, { useState } from 'react'
import { RandomTest } from './RandonTest'
import './rest_api.less'
const RestApi = () => {
  dlog.d('rendered')
  return (
    <div className="ws_api flex column" style={{ height: '100%', padding: 10 }}>
      <Tabs defaultActiveKey="3" style={{ flex: 1 }}>
        <Tabs.TabPane tab="RandonTest" key="3" style={{ flex: 1, height: '100%' }}>
          <RandomTest />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Test HTTP" key="1">
          <HTTPTestFragment />
        </Tabs.TabPane>
        <Tabs.TabPane tab="WebSocket" key="2" style={{ flex: 1, height: '100%' }}>
          <WSQuickTestFragment />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
type TResult = { icon: string; text: string; details: string; color: string }

const WSQuickTestFragment = () => {
  dlog.d('rendered')
  const ws = React.useRef<WebSocket | null>()
  const [method, setMethod] = useState('GET')
  const [connected, setConnected] = useState(false)
  const [url, setUrl] = useState('')
  const [data, setData] = useState('')
  const result = useArray<TResult>([])
  const [loading, setLoading] = useState(false)

  return (
    <div className="ws_api flex column" style={{ height: '100%', padding: 10 }}>
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
    </div>
  )
}

const HTTPTestFragment = () => {
  const [method, setMethod] = useState('GET')
  const [url, setUrl] = useState('')
  const [data, setData] = useState('')
  const [view, setView] = useState('')
  const [result, setResult] = useState('Hello')
  const [loading, setLoading] = useState(false)

  return (
    <div className="rest_api flex column" style={{ flex: 1, height: '100%' }}>
      <div className="flex column" style={{ background: 'white', padding: 10 }}>
        <div className="flex row" style={{}}>
          <Select defaultValue="GET" value={method} onChange={setMethod}>
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
          </Select>
          <Input placeholder="enter the URL" value={url} onChange={(e) => setUrl(e.target.value)}></Input>
          <Button
            loading={loading}
            type="primary"
            onClick={async () => {
              try {
                const result = await dnetwork.get(url)
                setResult(JSON.stringify(result))
              } catch (e) {
                setResult(e.message)
              }
            }}
          >
            Send
          </Button>
        </div>
        <Input.TextArea
          placeholder="enter the URL"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ marginTop: 10 }}
        />
      </div>
      <div
        className="flex column"
        style={{
          background: 'white',
          padding: 10,
          flex: 1,
          marginTop: 20,
          height: '100%',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Radio.Group value={view} onChange={(e) => setView(e.target.value)} size="middle">
            <Radio.Button value="raw">Raw</Radio.Button>
            <Radio.Button value="formatted">Formatted</Radio.Button>
            <Radio.Button value="preview">Preview</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ flex: 1, marginTop: 10, overflow: 'scroll' }}>
          {view == 'raw' ? <text>{result}</text> : null}
          {view == 'preview' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: result,
              }}
            ></div>
          ) : null}
        </div>
      </div>
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

export default RestApi
