import Joi from '@hapi/joi'
import { reject, propEq } from 'ramda'

import { Client } from '@app/client'
import { createPlayer } from '@app/engine'
import { addPlayerToGame } from '@app/state'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { makeGameJoinedMessage } from './game-joined'
import { makePlayerJoinedMessage } from './player-joined'

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
  const player = createPlayer(client, playerName)
  const game = addPlayerToGame(gameId, player)

  const otherPlayers = reject(propEq('id', player.id), game.getPlayers())

  await Promise.all([
    client.send(makeGameJoinedMessage(game, player)),
    ...otherPlayers.map((otherPlayer) => otherPlayer.client.send(makePlayerJoinedMessage(player))),
  ])
}

export function makeJoinGameMessage(gameId: string, playerName: string): MessageInterface {
  return {
    type: MessageType.JOIN_GAME,
    payload: { gameId, playerName },
  }
}

registerMessage(MessageType.JOIN_GAME, joinGamePayloadSchema, handleJoinGame)
