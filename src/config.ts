import * as convict from 'convict'
import * as dotenv from 'dotenv'

if (process.env.DOTENV) {
  dotenv.config({ path: process.env.DOTENV })
}

const definitions = {
  APP: {
    env: 'APP',
    format: '*',
    default: 'D.emails',
  },
  APP_PORT: {
    env: 'APP_PORT',
    format: 'port',
    default: 2010,
  },
  SENDGRID_API_KEY: {
    env: 'SENDGRID_API_KEY',
    format: String,
    default: '',
  },
}

const schema = convict(definitions)
schema.validate({ allowed: 'strict' })

const config = (name: string): any => {
  if (!name) {
    throw new Error('must pass config name')
  }

  if (!schema.has(name)) {
    throw new Error(`unknown config ${name}`)
  }

  if (schema.get(name) != null) {
    return schema.get(name)
  }

  throw Error(`missing config env value for ${definitions[name].env}`)
}

// Check if any env variable missing at the beginning
Object.keys(definitions).forEach(config)

export const appName = (): string => {
  return config('APP')
}

export const appPort = (): number => {
  return config('APP_PORT')
}

export const sendGridApiKey = (): string => {
  return config('SENDGRID_API_KEY')
}
