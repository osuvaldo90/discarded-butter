import Joi from '@hapi/joi'

import { Client } from '@app/client'
import { findGameById } from '@app/state'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { makeGameJoinedMessage } from './game-joined'
import { makeRejoinFailedMessage } from './rejoin-failed'

interface RejoinGamePayload {
  gameId: string
  playerKey: string
}

const rejoinGameSchema = Joi.object({
  gameId: Joi.string().required(),
  playerKey: Joi.string().required(),
})

async function handleRejoinGame(
  client: Client,
  { playerKey, gameId }: RejoinGamePayload,
): Promise<void> {
  const game = findGameById(gameId)
  if (game.hasPlayerByKey(playerKey)) {
    const player = game.getPlayerByKey(playerKey)
    player.updateClient(client)
    await client.send(makeGameJoinedMessage(game, player))
  } else {
    await client.send(makeRejoinFailedMessage())
  }
}

export function makeCreateGameMessage(playerName: string): MessageInterface {
  return {
    type: MessageType.REJOIN_GAME,
    payload: { playerName },
  }
}

registerMessage(MessageType.REJOIN_GAME, rejoinGameSchema, handleRejoinGame)
