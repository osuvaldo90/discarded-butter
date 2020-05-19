import Joi from '@hapi/joi'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

const rejoinFailedPayloadSchema = Joi.object({})

export function makeRejoinFailedMessage(): MessageInterface<undefined> {
  return {
    type: MessageType.REJOIN_FAILED,
    payload: undefined,
  }
}

registerMessage(MessageType.REJOIN_FAILED, rejoinFailedPayloadSchema)
