import { Router } from 'express'
import * as bodyParser from 'body-parser'
import { errors } from '../middleware'
import * as emailRoutes from './email'
import { setupHealthcheckRoute } from './healthcheck'

const setupRoutes = (swaggerValidator) => {
    const router: Router = Router()

    router.use(bodyParser.json())

    router
        .post('/emails', swaggerValidator.validate, emailRoutes.sendEmail)
        .get('/emails/:id', swaggerValidator.validate, emailRoutes.getEmail)
        .delete('/emails/:id', swaggerValidator.validate, emailRoutes.deleteEmail)

    router.use(errors)

    return router
}

export {
    setupHealthcheckRoute,
    setupRoutes,
}
