import * as expressLogger from 'express-bunyan-logger'
import { logger } from '../shared'

export const DEFAULT_IGNORED_ROUTES: string[] = ['/healthcheck', '/healthcheck/']

/**
 * Logs every route going through the middleware. Optional argument to ignore certain routes
 * @param ignoredRoutes An array of routes to ignore. Must be exact match
 */
const routeLogger = (ignoredRoutes: string[] = DEFAULT_IGNORED_ROUTES) => {
  return (req, res, next) => {
    const logRoute = expressLogger({
      name: `d-emails`,
      format: ':remote-address :incoming :method :url :status-code :res-headers[content-length] - :response-time ms',
      excludes: '*',
      genReqId: request => request.traceToken,
      logger,
    })

    // eslint-disable-next-line no-restricted-syntax
    for (const route of ignoredRoutes) {
      if (req.path === route) {
        return next()
      }
    }
    logRoute(req, res, next)
  }
}

export {
  routeLogger,
}
