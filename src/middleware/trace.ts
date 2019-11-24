import * as uuidv4 from 'uuid/v4'
import * as _ from 'lodash'
import { clsNamespace } from '../shared'

const traceTokenHeaderKey = 'x-trace-token'
const traceTokenClsKey = 'traceToken'

export const trace = (req: any, res, next) => {

  const traceToken = _.get(req, `body.${traceTokenClsKey}`, false) || req.get(traceTokenHeaderKey) || uuidv4()

  req.traceToken = traceToken
  res.set(traceTokenHeaderKey, traceToken)

  clsNamespace.bindEmitter(req)
  clsNamespace.bindEmitter(res)

  clsNamespace.run(() => {
    clsNamespace.set(traceTokenClsKey, req.traceToken)
    next()
  })

}
