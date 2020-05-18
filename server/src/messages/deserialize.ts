import { includes } from 'ramda'
import VError from 'verror'
import WebSocket from 'ws'

import { messageTypes } from './constants'
import { MessageInterface } from './message-interface'
import { getMessagePayloadSchema } from './registry'

function hasTypeProp(val: unknown): val is { type: unknown } {
  return typeof val === 'object' && !!val && 'type' in val
}

function isMessage(val: unknown): val is MessageInterface {
  return hasTypeProp(val) && typeof val.type === 'string' && includes(val.type, messageTypes)
}

export function deserialize(data: WebSocket.Data): MessageInterface {
  try {
    const message: unknown = JSON.parse(data.toString())

    if (!isMessage(message)) {
      throw new VError({ info: { message } }, `invalid message: ${JSON.stringify(message)}`)
    }

    const payloadSchema = getMessagePayloadSchema(message.type)
    const { error } = payloadSchema.validate(message.payload)

    if (error) {
      throw new VError({ cause: error, info: { message } }, error.annotate(true))
    }

    return message
  } catch (cause) {
    throw new VError({ cause, info: { data } }, 'deserialize')
  }
}
