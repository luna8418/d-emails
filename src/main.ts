import { Express } from 'express'
import { logger } from './shared'
import { setupApp } from './server'
import { appName, appPort } from './config'

const listen = (name: string, port: number) => (app: Express) => {
  app.listen(port, () => {
    logger.info(`Express app ${name} running at http://0.0.0.0:${port}/`)
  })
}

Promise.all([
  setupApp().then(listen(appName(), appPort())),
]).catch((err) => {
  logger.error({ err }, `Failed to start ${appName()} app.`)
})

process.on('uncaughtException', (err) => {
  logger.error({ err }, `main#uncaughtException ${err.message}`)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'main#unhandledRejection')
})
