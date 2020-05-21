import fs from 'fs'
import path from 'path'
import util from 'util'

import { pipe, endsWith } from 'ramda'
import VError from 'verror'
import WebSocket from 'ws'

import { MessageInterface, deserialize } from '@app/messages'
import { getMessageHandler } from '@app/messages/registry'

import { Client } from './client'

// const games = new Map<string, Game>()

// function handleJoinGame(client: ConnectedClient, { gameId, playerName }: JoinGamePayload): void {
//   try {
//     const game = games.get(gameId)
//     if (!game) throw new VError(`game not found: ${gameId}`)

//     game.addPlayer(createPlayer(playerName))
//   } catch (cause) {
//     throw new VError({ cause, info: { gameId, playerName } }, 'handleJoinGame')
//   }
// }

const handleMessage = (socket: WebSocket) => async ({
  type,
  payload,
}: MessageInterface): Promise<void> => {
  try {
    const client = new Client(socket)
    const handler = getMessageHandler(type)
    await handler(client, payload)
  } catch (cause) {
    throw new VError({ cause, info: { type, payload } }, 'handleMessage')
  }
}

const readDir = util.promisify(fs.readdir)

const MESSAGE_DIR = path.join(__dirname, '/messages/definitions')

async function registerMessages(): Promise<void> {
  const messageFileNames = await readDir(MESSAGE_DIR)
  const messageFilePaths = messageFileNames.filter(endsWith('.js')).map((fileName) => {
    return path.join(MESSAGE_DIR, fileName)
  })
  await Promise.all(messageFilePaths.map((filePath) => import(filePath)))
}

export async function startServer(options: WebSocket.ServerOptions): Promise<WebSocket.Server> {
  await registerMessages()

  return new Promise((resolve) => {
    const server = new WebSocket.Server(options)

    server.on('listening', () => {
      resolve(server)
    })

    server.on('connection', (socket) => {
      console.log('new client')
      const handleData = pipe(deserialize, handleMessage(socket))
      socket.on('message', async (data) => {
        console.log('recv data\n', data)
        try {
          return await handleData(data)
        } catch (cause) {
          const error = new VError({ cause, info: { data } }, `on('message')`)
          console.error(VError.fullStack(error))
          console.error(JSON.stringify(VError.info(error), null, 2) + '\n')
        }
      })
    })
  })
}
