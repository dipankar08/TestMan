const routes: RouteConfig[] = [
  {
    name: 'adb',
    path: '/adb',
    windowOptions: {
      title: 'adb',
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
