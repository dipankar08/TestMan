import { Tabs } from 'antd'
import { dlog } from 'corexxx'
import React from 'react'

const MainView = () => {
  dlog.d('rendered')
  return (
    <div className="ws_api flex column" style={{ height: '100%', padding: 10 }}>
      <Tabs defaultActiveKey="3" style={{ flex: 1 }}>
        <Tabs.TabPane tab="RandonTest" key="3" style={{ flex: 1, height: '100%' }}></Tabs.TabPane>
        <Tabs.TabPane tab="Test HTTP" key="1"></Tabs.TabPane>
        <Tabs.TabPane tab="WebSocket" key="2" style={{ flex: 1, height: '100%' }}></Tabs.TabPane>
      </Tabs>
    </div>
  )
}
export default MainView
