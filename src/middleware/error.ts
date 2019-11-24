import { InputValidationError } from 'express-ajv-swagger-validation'
import { logger } from '../shared'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errors = (err: InputValidationError | Error, req, res, next) => {

  logger.error({ err }, `Unexpected Error occurred: ${err.message}`)

  if (err instanceof InputValidationError) {
    const error = err as InputValidationError
    logger.error({ errors: error.errors }, 'Failed to pass the input validation')
    return res.status(400).json(JSON.stringify(error.errors))
  }

  return res.status(500).json(err)
}
