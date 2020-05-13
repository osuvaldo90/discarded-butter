import VError from 'verror'
import WebSocket from 'ws'

import { MessageInterface } from '@app/messages'
import { getMessagePayloadSchema } from '@app/messages/registry'

export class Client {
  constructor(private socket: WebSocket) {}

  async send(message: MessageInterface): Promise<void> {
    try {
      const payloadSchema = getMessagePayloadSchema(message.type)
      const { error: payloadError } = payloadSchema.validate(message.payload)

      if (payloadError) {
        throw new VError({ cause: payloadError }, payloadError.annotate(true))
      }

      return await new Promise((resolve, reject) => {
        this.socket.send(JSON.stringify(message), (error) => {
          if (error) reject(error)
          else resolve()
        })
      })
    } catch (cause) {
      throw new VError({ cause, info: { message } }, 'Client.send')
    }
  }
}
