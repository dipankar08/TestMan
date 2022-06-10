import { Button, Input, Select } from 'antd'
import { dnetwork } from 'corexxx'
import React, { useState } from 'react'
import './rest_api.less'
const RestApi: React.FC<PageProps> = () => {
  let [method, setMethod] = useState('GET')
  let [url, setUrl] = useState('')
  let [data, setData] = useState('')
  let [result, setResult] = useState('')
  let [loading, setLoading] = useState(false)

  return (
    <div className="rest_api flex column" style={{ height: '100%', padding: 20 }}>
      <div className="flex row" style={{ background: 'white', padding: 10 }}>
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
      <div style={{ position: 'absolute' }}>
        <text>{result}</text>
      </div>
    </div>
  )
}

export default RestApi
