const DEFAULT_ROUTE_CONFIG: Partial<RouteConfig> = {}
const pages = require.context('@/src/views', true, /\/auto\.routes\.tsx?$/)
const routes: Map<string, RouteConfig> = new Map()
pages.keys().forEach((path) => {
  const conf: RouteConfig | RouteConfig[] = pages(path).default
  flatRoutes(conf)
})

function flatRoutes(routes: RouteConfig | RouteConfig[], parent?: RouteConfig) {
  const routesH = Array.isArray(routes) ? routes : [routes]
  routesH.forEach((conf) => {
    if (parent) {
      conf.parentNamePath = parent.parentNamePath ? parent.parentNamePath.concat(parent.name) : [parent.name]
      conf.parent = parent
    }

    if (Array.isArray(conf.routes) && conf.routes.length) {
      flatRoutes(conf.routes, conf)
    } else {
    }
    addRouteConfig(Object.assign({}, DEFAULT_ROUTE_CONFIG, conf))
  })
}
function addRouteConfig(conf: RouteConfig) {
  routes.set(conf.name, conf)
}

export default routes
