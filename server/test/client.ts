import { isEmpty } from 'ramda'
import VError from 'verror'
import WebSocket from 'ws'

import { getEnvInt } from '@app/config'
import { MessageInterface, deserialize } from '@app/messages'
import { getMessagePayloadSchema } from '@app/messages/registry'

export class TestClient {
  constructor(private socket: WebSocket) {
    this.responses = []

    this.socket.on('message', (data) => {
      try {
        const deserialized = deserialize(data)
        this.responses.push(deserialized)
      } catch (cause) {
        throw new VError({ cause, info: { data } }, 'TestClient')
      }
    })
  }

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

  async waitForResponse(): Promise<MessageInterface> {
    const MAX_TRIES = 25
    const sleep = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 10))
    let tries = 0
    while (isEmpty(this.responses)) {
      await sleep()

      if (tries++ > MAX_TRIES) {
        throw new Error('TestClient.waitForResponse: timed out')
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.responses.shift()!
  }

  async disconnect(): Promise<void> {
    this.socket.close()
  }

  private responses: MessageInterface[]
}

export function getTestPort(): number {
  return getEnvInt('PORT', 8181)
}

export async function connectToServer(): Promise<TestClient> {
  return new Promise((resolve) => {
    const port = getTestPort()
    const address = `ws://localhost:${port}`
    const socket = new WebSocket(address)

    socket.on('open', () => {
      resolve(new TestClient(socket))
    })
  })
}
