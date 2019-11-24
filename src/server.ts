import * as path from 'path'
import * as express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerValidator from 'express-ajv-swagger-validation'
import * as YAML from 'yamljs'
import { setupHealthcheckRoute, setupRoutes } from './routes'
import { trace, routeLogger } from './middleware'

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'))

export const setupApp = async (): Promise<express.Express> => {
  const app: express.Express = express()
  await swaggerValidator.init(path.join(__dirname, 'swagger.yaml'), {
    beautifyErrors: true,
  })
  app.use(trace, routeLogger())
  app.use('/', setupHealthcheckRoute())
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.use('/v1/', setupRoutes(swaggerValidator))

  return app
}
