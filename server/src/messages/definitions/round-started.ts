import { Round, Player, SerializedRound } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { roundSchema } from './common'

type RoundStartedPayload = SerializedRound

const roundStartedPayloadSchema = roundSchema

export function makeRoundStartedMessage(
  player: Player,
  round: Round,
): MessageInterface<RoundStartedPayload> {
  return {
    type: MessageType.ROUND_STARTED,
    payload: round.serializeForPlayer(player),
  }
}

registerMessage(MessageType.ROUND_STARTED, roundStartedPayloadSchema)
