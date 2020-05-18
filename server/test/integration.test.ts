import { Server } from 'http'

import test, { Test } from 'blue-tape'
import { zip, init } from 'ramda'
import WebSocket from 'ws'

import { MessageType } from '@app/messages/constants'
import { makeCreateGameMessage } from '@app/messages/definitions/create-game'
import { isGameCreatedPayload } from '@app/messages/definitions/game-created'
import { isGameJoinedPayload } from '@app/messages/definitions/game-joined'
import { makeJoinGameMessage } from '@app/messages/definitions/join-game'
import { startServer } from '@app/server'

import { connectToServer, TestClient, getTestPort } from './client'

test('game', (t) => {
  let server: WebSocket.Server
  let gameId: string
  const players: TestClient[] = []
  const playerIds: string[] = []

  async function joinGame(t: Test, playerName: string): Promise<void> {
    const client = await connectToServer()
    t.pass(`${playerName} connected`)
    players.push(client)

    await client.send(makeJoinGameMessage(gameId, playerName))
    t.pass('sent JOIN_GAME message')

    const { type, payload } = await client.waitForResponse()
    t.equal(type, MessageType.GAME_JOINED, `got back GAME_JOINED`)

    if (isGameJoinedPayload(payload)) {
      t.pass('GAME_JOINED payload is valid')
      t.equal(payload.gameId, gameId, 'gameId is correct')

      playerIds.push(payload.playerId)

      const numExpectedPlayers = playerIds.length
      t.equal(payload.players.length, numExpectedPlayers, `there are ${numExpectedPlayers} players`)

      for (const [serverPlayer, localPlayerId] of zip(init(payload.players), playerIds)) {
        t.equal(serverPlayer.id, localPlayerId)
      }
    } else {
      t.fail('GAME_JOINED payload is valid')
    }
  }

  t.test('start server', async (t) => {
    server = await startServer({ port: getTestPort() })
    t.pass('server started')
  })

  t.test('player can create game', async (t) => {
    const firstPlayer = await connectToServer()
    players.push(firstPlayer)
    t.pass('player 1 connected')

    await firstPlayer.send(makeCreateGameMessage('player 1'))
    const { type, payload } = await firstPlayer.waitForResponse()

    t.equal(type, MessageType.GAME_CREATED, 'got back GAME_CREATED')

    if (isGameCreatedPayload(payload)) {
      gameId = payload.gameId
      playerIds.push(payload.playerId)
      t.pass('GAME_CREATED payload is valid')
    } else {
      t.fail('GAME_CREATED payload is valid')
    }
  })

  t.test('2 more players join the game', async (t) => {
    await joinGame(t, 'player 2')
    await joinGame(t, 'player 3')
  })

  t.test('kill connections', async (t) => {
    for (const player of players) {
      player.disconnect()
    }
    await new Promise((resolve) => server.close(resolve))
  })
})
