const routes: RouteConfig[] = [
  {
    name: 'WSTest',
    path: '/ws_test',
    windowOptions: {
      title: 'WS Automation',
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      width: 300,
      height: 240,
    },
    createConfig: {
      hideMenus: true,
    },
  },
]

export default routes
