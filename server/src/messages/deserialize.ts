import joi from '@hapi/joi'
import VError from 'verror'
import WebSocket from 'ws'

import { messageTypes } from './constants'
import { MessageInterface } from './message-interface'
import { getMessagePayloadSchema } from './registry'

const messageSchema = joi.object({
  type: joi
    .string()
    .valid(...messageTypes)
    .required(),
  payload: joi.object({}).required().unknown(),
})

export function deserialize(message: WebSocket.Data): MessageInterface {
  const messageStr = message.toString()

  try {
    const parsed = JSON.parse(messageStr)
    const { value: validatedMessageValue, error: messageError } = messageSchema.validate(parsed)

    if (messageError) {
      throw new VError({ cause: messageError }, messageError.annotate(true))
    }

    const validatedMessage = validatedMessageValue as MessageInterface

    const payloadSchema = getMessagePayloadSchema(validatedMessage.type)
    const { error: payloadError } = payloadSchema.validate(validatedMessage.payload)

    if (payloadError) {
      throw new VError({ cause: payloadError }, payloadError.annotate(true))
    }

    return validatedMessage
  } catch (cause) {
    throw new VError({ cause, info: { messageStr } }, 'deserialize')
  }
}
