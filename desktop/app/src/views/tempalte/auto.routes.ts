const routes: RouteConfig[] = [
  {
    name: 'template',
    path: '/template',
    windowOptions: {
      title: 'temaplte',
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
