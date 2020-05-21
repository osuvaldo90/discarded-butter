import { Game, Player, SerializedGameState } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { gameStateSchema } from './common'

export type GameCreatedPayload = SerializedGameState

const gameCreatedSchema = gameStateSchema

export function makeGameCreatedMessage(
  game: Game,
  player: Player,
): MessageInterface<GameCreatedPayload> {
  return {
    type: MessageType.GAME_CREATED,
    payload: game.serializeForPlayer(player),
  }
}

export function isGameCreatedPayload(val: unknown): val is GameCreatedPayload {
  return !gameCreatedSchema.validate(val).error
}

registerMessage(MessageType.GAME_CREATED, gameCreatedSchema)
