import Joi from '@hapi/joi'

import { Client } from '@app/client'
import { Round, Player } from '@app/engine'
import { findGameByPlayerKey } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

import { makeEndRoundMessage } from './end-round'
import { makeRoundStartedMessage } from './round-started'

interface StartRoundPayload {
  playerKey: string
}

const startRoundPayloadSchema = Joi.object({
  playerKey: Joi.string().required(),
})

async function handleStartRound(client: Client, { playerKey }: StartRoundPayload): Promise<void> {
  const game = findGameByPlayerKey(playerKey)

  async function onEndRound(round: Round, players: Player[]): Promise<void> {
    await Promise.all(players.map((player) => player.client.send(makeEndRoundMessage(round))))
  }

  const round = game.startRound(onEndRound)
  const players = game.getPlayers()

  await Promise.all(
    players.map((player) => player.client.send(makeRoundStartedMessage(player, round))),
  )
}

registerMessage(MessageType.START_ROUND, startRoundPayloadSchema, handleStartRound)
