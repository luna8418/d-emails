import { chance, suiteName } from '../shared'
import { Email } from '../types'
import { send } from './sendGridService'
import * as sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/client/src/response'

jest.mock('@sendgrid/mail')

const mockedSgMail = sgMail as jest.Mocked<typeof sgMail>

describe(suiteName(__filename), () => {
  const email: Email = {
    from: chance.email(),
    to: chance.email(),
    subject: chance.string(),
    content: chance.string(),
  }
  const sgResponse: ClientResponse = {
    statusCode: 200,
  } as ClientResponse

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('handleEmail', () => {
    it('when email sent successfully', async () => {
      mockedSgMail.send.mockResolvedValue([sgResponse, {}])

      const result: boolean = await send(email)

      expect(result).toBeTruthy
    })

    it('when email sent failed', async () => {
      mockedSgMail.send.mockImplementation(() => {
        throw new Error()
      })

      const result: boolean = await send(email)

      expect(result).toBeFalsy
    })
  })

})