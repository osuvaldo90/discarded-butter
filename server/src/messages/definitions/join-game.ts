import Joi from '@hapi/joi'

import { Client } from '@app/client'
import { createPlayer } from '@app/game'
import { findGame } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

const joinGamePayloadSchema = Joi.object({
  gameId: Joi.string().required(),
  playerName: Joi.string().required(),
})

interface JoinGamePayload {
  gameId: string
  playerName: string
}

async function handleJoinGame(
  client: Client,
  { gameId, playerName }: JoinGamePayload,
): Promise<void> {
  const game = findGame(gameId)
  game.addPlayer(createPlayer(playerName))
  // client.send()
}

registerMessage(MessageType.JOIN_GAME, joinGamePayloadSchema, handleJoinGame)
