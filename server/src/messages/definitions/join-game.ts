import Joi from '@hapi/joi'

import { Client } from '@app/client'
import { createPlayer } from '@app/engine'
import { findGame } from '@app/state'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { makeGameJoinedMessage } from './game-joined'

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
  const player = createPlayer(playerName)
  game.addPlayer(player)
  await client.send(makeGameJoinedMessage(game, player))
}

export function makeJoinGameMessage(gameId: string, playerName: string): MessageInterface {
  return {
    type: MessageType.JOIN_GAME,
    payload: { gameId, playerName },
  }
}

registerMessage(MessageType.JOIN_GAME, joinGamePayloadSchema, handleJoinGame)
