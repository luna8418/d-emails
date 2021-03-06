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
    status: EmailStatus.SENT,
  }

  beforeEach(async () => {
    app = await express.setupApp()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should delete email', async () => {

    mockedEmailService.deleteEmail.mockResolvedValue(emailItem)

    await request(app)
      .delete(`/v1/emails/${emailItem.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ id: emailItem.id, deleted: true })
      })
  })

})
