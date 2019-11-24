import { chance, suiteName } from '../shared'
import { Email, EmailItem, EmailStatus } from '../types'
import * as sendGridService from './sendGridService'
import { handleEmail, getEmail, deleteEmail, } from './emailService'

jest.mock('./sendGridService')

const mockedSendGridService = sendGridService as jest.Mocked<typeof sendGridService>

describe(suiteName(__filename), () => {
  const email: Email = {
    from: chance.email(),
    to: chance.email(),
    subject: chance.string(),
    content: chance.string(),
  }

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('handleEmail', () => {
    it('when email sent successfully', async () => {
      mockedSendGridService.send.mockResolvedValue(true)

      const emailItem: EmailItem = await handleEmail(email)
      const { id, from, to, subject, content, status } = emailItem

      expect(id).toBeTruthy
      expect(from).toEqual(email.from)
      expect(to).toEqual(email.to)
      expect(subject).toEqual(email.subject)
      expect(content).toEqual(email.content)
      expect(status).toEqual(EmailStatus.SENT)
    })

    it('when email sent failed', async () => {
      mockedSendGridService.send.mockResolvedValue(false)

      const emailItem: EmailItem = await handleEmail(email)
      const { id, from, to, subject, content, status } = emailItem

      expect(id).toBeTruthy
      expect(from).toEqual(email.from)
      expect(to).toEqual(email.to)
      expect(subject).toEqual(email.subject)
      expect(content).toEqual(email.content)
      expect(status).toEqual(EmailStatus.FAILED)
    })
  })

  describe('getEmail', () => {
    it('should work', async () => {
      mockedSendGridService.send.mockResolvedValue(true)

      const savedEmailItem: EmailItem = await handleEmail(email)
      const { id, from, to, subject, content, status } = savedEmailItem
      const emailItem: EmailItem = await getEmail(id)

      expect(id).toEqual(emailItem.id)
      expect(from).toEqual(emailItem.from)
      expect(to).toEqual(emailItem.to)
      expect(subject).toEqual(emailItem.subject)
      expect(content).toEqual(emailItem.content)
      expect(status).toEqual(emailItem.status)
    })
  })

  describe('deleteEmail', () => {
    it('should work', async () => {
      mockedSendGridService.send.mockResolvedValue(true)

      const savedEmailItem: EmailItem = await handleEmail(email)
      const { id, from, to, subject, content, status } = savedEmailItem
      const emailItem: EmailItem = await deleteEmail(id)
      const getEmailItem: EmailItem = await getEmail(id)

      expect(id).toEqual(emailItem.id)
      expect(from).toEqual(emailItem.from)
      expect(to).toEqual(emailItem.to)
      expect(subject).toEqual(emailItem.subject)
      expect(content).toEqual(emailItem.content)
      expect(status).toEqual(emailItem.status)

      expect(getEmailItem).toBeFalsy
    })
  })
})