import { Router } from 'express'
import * as expressHealthcheck from 'express-healthcheck'

export const setupHealthcheckRoute = () => {
    const router: Router = Router()

    router.use('/healthcheck', expressHealthcheck({
        test: () => 'ok',
    }))

    return router
}
