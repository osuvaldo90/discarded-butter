import joi from '@hapi/joi'
import VError from 'verror'

import { Client } from '@app/client'

import { MessageType } from './constants'

type MessageHandler = (client: Client, payload: any) => Promise<void>

interface MessagePayloadStuff {
  schema: joi.ObjectSchema
  handler: MessageHandler
}

const globalMessageRegistry = new Map<MessageType, MessagePayloadStuff>()

const defaultHandler = (client: Client, payload: any): Promise<void> => {
  throw new Error('no handler')
}

export function registerMessage(
  type: MessageType,
  payloadSchema: joi.ObjectSchema,
  handler: MessageHandler = defaultHandler,
): void {
  if (globalMessageRegistry.has(type)) {
    throw new VError({ info: { type } }, `registerMessage: message type ${type} already registered`)
  }

  console.log('registering ', type)

  globalMessageRegistry.set(type, { schema: payloadSchema, handler })
}

export function getMessagePayloadSchema(type: MessageType): joi.ObjectSchema {
  const item = globalMessageRegistry.get(type)

  if (!item)
    throw new VError({ info: { type } }, `getPayloadValidator: message type ${type} not found`)

  return item.schema
}

export function getMessageHandler(type: MessageType): MessageHandler {
  const item = globalMessageRegistry.get(type)

  if (!item)
    throw new VError({ info: { type } }, `getPayloadValidator: message type ${type} not found`)

  return item.handler
}
