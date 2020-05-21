import { Round, Player, SerializedRound } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { roundSchema } from './common'

type GameStartedPayload = SerializedRound

const gameStartedPayloadSchema = roundSchema

export function makeGameStartedMessage(
  player: Player,
  round: Round,
): MessageInterface<GameStartedPayload> {
  return {
    type: MessageType.GAME_STARTED,
    payload: round.serializeForPlayer(player),
  }
}

registerMessage(MessageType.GAME_STARTED, gameStartedPayloadSchema)
