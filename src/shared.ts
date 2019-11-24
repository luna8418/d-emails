import * as bunyan from 'bunyan'
import { uuid } from 'uuidv4'
import { createNamespace, Namespace } from 'cls-hooked'
import { appName } from './config'
import * as Chance from 'chance'
import * as path from 'path'

const chance = new Chance()

const suiteName = (file: string) => path.relative(`${__dirname}/../..`, file).split(path.sep).join('#')

const clsNamespaceKey = uuid()

const clsNamespace: Namespace = createNamespace(clsNamespaceKey)

const logger = bunyan.createLogger({ name: appName() })

export {
  clsNamespace,
  clsNamespaceKey,
  logger,
  chance,
  suiteName,
}
