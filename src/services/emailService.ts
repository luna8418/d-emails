import { uuid } from 'uuidv4'
import * as sendGridService from './sendGridService'
import { Email, EmailItem, EmailStatus } from '../types'
import { logger } from '../shared'

// TODO Use map to cache email to replace DB at the moment
const emailCache: Map<string, EmailItem> = new Map()

/**
 * TODO add logic to decide when to queue or send email
 * TODO And also add the code to pull queued email and process at scheduled time
 */
export const shouldSendNow = (): boolean => {
    return true
}

export const sendEmail = async (email: Email): Promise<EmailStatus> => {
    return await sendGridService.send(email) ? EmailStatus.SENT : EmailStatus.FAILED
}

export const handleEmail = async (email: Email): Promise<EmailItem> => {
    const id: string = uuid()
    logger.info(`generate email id = ${id}`)

    let status: EmailStatus
    if (shouldSendNow) {
        status = await sendEmail(email)
    } else {
        status = EmailStatus.QUEUED
    }

    const emailItem: EmailItem = { id, ...email, status }
    emailCache.set(id, emailItem)

    return emailItem
}

export const getEmail = async (id: string): Promise<EmailItem> => {
    return emailCache.get(id)
}

export const deleteEmail = async (id: string): Promise<EmailItem> => {
    const email: EmailItem = await getEmail(id)

    emailCache.delete(id)

    return email
}
