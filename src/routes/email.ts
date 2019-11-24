import { Request, Response } from 'express'
import { Email, EmailItem } from '../types'
import { logger } from '../shared'
import * as emailService from '../services/emailService'

export const sendEmail = async (req: Request, res: Response) => {
    const email: Email = req.body
    logger.info(`Email received -> ${JSON.stringify(email)}`)

    const emailItem: EmailItem = await emailService.handleEmail(email)
    logger.info(`Email handled -> ${JSON.stringify(emailItem)}`)

    const { id, status } = emailItem
    res.status(200).json({ id, status })
}

export const getEmail = async (req: Request, res: Response) => {
    const { id } = req.params
    logger.debug(`getEmail -> ${id}`)

    const email: EmailItem = await emailService.getEmail(id)
    if (!email) {
        res.status(404).end()
        return
    }

    res.status(200).json({ id, status: email.status })
}

export const deleteEmail = async (req: Request, res: Response) => {
    const { id } = req.params
    logger.debug(`deleteEmail -> ${id}`)

    const email: EmailItem = await emailService.deleteEmail(id)
    if (!email) {
        res.status(404).end()
        return
    }

    res.status(200).json({ id, deleted: true })
}
