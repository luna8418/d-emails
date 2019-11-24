import * as httpMocks from 'node-mocks-http'
import { Email, EmailItem, EmailStatus } from '../types'
import { chance, suiteName } from '../shared'
import * as emailService from '../services/emailService'
import { sendEmail, getEmail, deleteEmail } from './email'

jest.mock('../services/emailService')

const mockedEmailService = emailService as jest.Mocked<typeof emailService>

describe(suiteName(__filename), () => {
  const email: Email = {
    from: chance.email(),
    to: chance.email(),
    subject: chance.string(),
    content: chance.string(),
  }
  const emailItem: EmailItem = {
    id: chance.guid(),
    ...email,
    status: EmailStatus.SENT,
  }

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('sendEmail', () => {
    it('services called correctly', async () => {
      mockedEmailService.handleEmail.mockResolvedValue(emailItem)

      const body = { ...email }
      const req: any = httpMocks.createRequest({ body })
      const res = httpMocks.createResponse()

      await sendEmail(req, res)
      const { id, status } = emailItem

      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toEqual(200)

      const resData = res._getJSONData()
      expect(resData).toEqual({ id, status })

      expect(mockedEmailService.handleEmail).toBeCalledWith(email)
    })
  })

  describe('getEmail', () => {
    it('services called correctly', async () => {
      mockedEmailService.getEmail.mockResolvedValue(emailItem)

      const params = { id: emailItem.id }
      const req: any = httpMocks.createRequest({ params })
      const res = httpMocks.createResponse()

      await getEmail(req, res)
      const { id, status } = emailItem

      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toEqual(200)

      const resData = res._getJSONData()
      expect(resData).toEqual({ id, status })

      expect(mockedEmailService.getEmail).toBeCalledWith(emailItem.id)
    })
  })

  describe('deleteEmail', () => {
    it('services called correctly', async () => {
      mockedEmailService.deleteEmail.mockResolvedValue(emailItem)

      const params = { id: emailItem.id }
      const req: any = httpMocks.createRequest({ params })
      const res = httpMocks.createResponse()

      await deleteEmail(req, res)
      const { id } = emailItem

      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toEqual(200)

      const resData = res._getJSONData()
      expect(resData).toEqual({ id, deleted: true })

      expect(mockedEmailService.deleteEmail).toBeCalledWith(emailItem.id)
    })
  })
})
