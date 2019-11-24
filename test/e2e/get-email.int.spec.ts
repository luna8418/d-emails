import * as request from 'supertest'
import { Email, EmailItem, EmailStatus } from '../../src/types'
import { chance, suiteName } from '../../src/shared'
import * as express from '../../src/server'
import * as emailService from '../../src/services/emailService'

jest.mock('../../src/services/emailService')

const mockedEmailService = emailService as jest.Mocked<typeof emailService>

describe(suiteName(__filename), () => {

  let app: any = {}
  const email: Email = {
    from: chance.email(),
    to: chance.email(),
    subject: chance.string(),
    content: chance.string(),
  }
  const emailItem: EmailItem = {
    id: chance.guid(),
    ...email,
    status: EmailStatus.QUEUED,
  }

  beforeEach(async () => {
    app = await express.setupApp()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should delete email', async () => {

    mockedEmailService.getEmail.mockResolvedValue(emailItem)

    await request(app)
      .get(`/v1/emails/${emailItem.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ id: emailItem.id, status: emailItem.status })
      })
  })

})
