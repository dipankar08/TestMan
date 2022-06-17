//// @ts-nocheck
import { Button } from 'antd'
import React, { useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { _execute } from '../utils/executor'
import { helper_function } from '../utils/helper_function'

// call the function

const oldLog = console.log
console.log = function (value) {
  oldLog(value)
  return value
}
const execute = _execute
function foo() {
  console.log('foo')
}

export const RandomTest = () => {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('No result')
  return (
    <div className="rest_api flex column" style={{ flex: 1, height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <text style={{ flex: 1, color: 'black', fontSize: 20, marginBottom: 10 }}>Rich Automation Editor</text>
        <Button
          type="primary"
          onClick={async () => {
            const fn = `
            // this is a generated code...
            ${helper_function}
            ( async()=> {
                ${code}
            })();
            `
            try {
              const fs = require('fs')
              try {
                fs.writeFileSync('/tmp/myfile.js', fn, 'utf-8')
              } catch (e) {
                alert('Failed to save the file !')
              }
              const result = await execute('node /tmp/myfile.js')
              console.log(result)
              setResult(result.stdout)
            } catch (e) {
              setResult(`Error: ${e.message} ${e.stack}`)
            }
          }}
        >
          test
        </Button>
      </div>
      <div className="rest_api flex row" style={{ flex: 1, height: '100%' }}>
        <div style={{ flex: 1, marginRight: 10, height: '100%', width: '100%' }}>
          <MonacoEditor
            language="javascript"
            theme="vs-light"
            height="100%"
            width="100%"
            value={code}
            options={{ selectOnLineNumbers: true, minimap: { enabled: false }, wordWrap: 'on' }}
            onChange={(x) => setCode(x)}
            editorDidMount={() => {}}
          />
        </div>
        <pre style={{ fontSize: 10, height: '100%', width: 400, background: 'white', padding: 10 }}>
          {result}
        </pre>
      </div>
    </div>
  )
}
