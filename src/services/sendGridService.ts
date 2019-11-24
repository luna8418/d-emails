import * as sgMail from '@sendgrid/mail'
import { MailData } from '@sendgrid/helpers/classes/mail'
import { ClientResponse } from '@sendgrid/client/src/response'
import { Email } from '../types'
import { logger } from '../shared'
import { sendGridApiKey } from '../config'

sgMail.setApiKey(sendGridApiKey())

export const send = async (email: Email): Promise<boolean> => {
  const { from, to, cc, bcc, subject, content } = email
  const mailData: MailData = {
    from,
    to,
    cc,
    bcc,
    subject,
    text: content,
  }

  try {

    const result: [ClientResponse, {}] = await sgMail.send(mailData)
    const response: ClientResponse = result[0]
    if (response && response.statusCode >= 200 && response.statusCode < 300) {
      return true
    }
  } catch (err) {
    logger.error(`Sending email failed: ${err.message}`)
  }

  return false
}
