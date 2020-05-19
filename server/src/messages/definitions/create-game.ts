import Joi from '@hapi/joi'
import { customAlphabet } from 'nanoid'

import { Client } from '@app/client'
import { Game, createPlayer } from '@app/engine'
import { gameIdExists, storeGame } from '@app/state'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { makeGameCreatedMessage } from './game-created'

const createGamePayloadSchema = Joi.object({
  playerName: Joi.string().required(),
})

interface CreateGamePayload {
  playerName: string
}

const nanoid = customAlphabet('ABCDEFGHIJKLMNPQRSTUVWXYZ', 4)

async function handleCreateGame(client: Client, { playerName }: CreateGamePayload): Promise<void> {
  let gameId
  do {
    gameId = nanoid()
  } while (gameIdExists(gameId))

  const game = new Game(gameId)
  const player = createPlayer(client, playerName)
  game.addPlayer(player)
  storeGame(game)

  await client.send(makeGameCreatedMessage(game, player))
}

export function makeCreateGameMessage(playerName: string): MessageInterface {
  return {
    type: MessageType.CREATE_GAME,
    payload: { playerName },
  }
}

registerMessage(MessageType.CREATE_GAME, createGamePayloadSchema, handleCreateGame)
