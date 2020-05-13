import Joi from '@hapi/joi'
import shortid from 'shortid'

import { Client } from '@app/client'
import { Game, createPlayer } from '@app/game'
import { gameIdExists, storeGame } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

import { makeGameCreatedMessage } from './game-created'

const createGamePayloadSchema = Joi.object({
  playerName: Joi.string().required(),
})

interface CreateGamePayload {
  playerName: string
}

async function handleCreateGame(client: Client, { playerName }: CreateGamePayload): Promise<void> {
  let gameId
  do {
    gameId = shortid.generate()
  } while (gameIdExists(gameId))

  const game = new Game(gameId)
  game.addPlayer(createPlayer(playerName))
  storeGame(game)

  await client.send(makeGameCreatedMessage({ gameId }))
}

registerMessage(MessageType.CREATE_GAME, createGamePayloadSchema, handleCreateGame)
