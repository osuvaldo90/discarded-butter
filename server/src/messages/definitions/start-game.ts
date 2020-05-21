import Joi from '@hapi/joi'

import { Client } from '@app/client'
import { findGameByPlayerKey } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

import { makeGameStartedMessage } from './game-started'

interface StartGamePayload {
  playerKey: string
}

const startGamePayloadSchema = Joi.object({
  playerKey: Joi.string().required(),
})

async function handleStartGame(client: Client, { playerKey }: StartGamePayload): Promise<void> {
  const game = findGameByPlayerKey(playerKey)
  const round = game.startRound()
  const players = game.getPlayers()

  await Promise.all(
    players.map((player) => player.client.send(makeGameStartedMessage(player, round))),
  )
}

registerMessage(MessageType.START_GAME, startGamePayloadSchema, handleStartGame)
