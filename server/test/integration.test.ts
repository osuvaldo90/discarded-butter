import test from 'blue-tape'
import R from 'ramda'
import WebSocket from 'ws'

import { startServer } from '@app/server'

const PORT = 8181
const SERVER_ADDRESS = 'ws://localhost:8181'

class PlayerClient {
  constructor(private webSocket: WebSocket) {
    this.responses = []

    this.webSocket.on('message', (data) => {
      try {
        const deserialized = JSON.parse(data.toString())
        this.responses = R.append(deserialized, this.responses)
      } catch (err) {
        console.error('failed to parse data', data)
      }
    })
  }

  async send(message: object): Promise<void> {
    return new Promise((resolve, reject) => {
      this.webSocket.send(JSON.stringify(message), (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  async waitForResponse(): Promise<any> {
    const sleep = () => new Promise((resolve) => setTimeout(resolve, 10))

    while (R.isEmpty(this.responses)) {
      await sleep()
    }

    const response = R.head(this.responses)
    this.responses = R.tail(this.responses)
    return response!
  }

  private responses: object[]
}

async function connectToServer(address: string): Promise<PlayerClient> {
  return new Promise((resolve) => {
    const webSocket = new WebSocket(address)

    webSocket.on('open', () => {
      resolve(new PlayerClient(webSocket))
    })
  })
}

test('game', async (t) => {
  await startServer({ port: PORT })

  const firstClient = await connectToServer(SERVER_ADDRESS)
  await firstClient.send({
    type: 'CREATE_GAME',
    payload: {
      playerName: 'player1',
    },
  })

  const { type, payload } = await firstClient.waitForResponse()
  t.equal(type, 'GAME_CREATED', 'got back GAME_CREATED')
  t.ok(!R.isNil(payload), 'got payload')
  t.ok(!R.isNil(payload.gameId), 'got payload.gameId')

  const otherClients = await Promise.all([
    connectToServer(SERVER_ADDRESS),
    connectToServer(SERVER_ADDRESS),
    connectToServer(SERVER_ADDRESS),
  ])

  const joinGame = (client: PlayerClient, index: number): Promise<void> =>
    client.send({
      type: 'JOIN_GAME',
      payload: { gameId: payload.gameId, playerName: 'player' + (index + 2) },
    })
  await Promise.all(otherClients.map(joinGame))

  const responses = await Promise.all(otherClients.map((client) => client.waitForResponse()))
  console.log(responses)
})
