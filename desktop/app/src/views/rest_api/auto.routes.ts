const routes: RouteConfig[] = [
  {
    name: 'RestApi',
    path: '/rest_api',
    windowOptions: {
      title: 'JEST',
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
