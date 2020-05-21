import { Game, Player, SerializedGameState } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { gameStateSchema } from './common'

type GameJoinedPayload = SerializedGameState

const gameJoinedSchema = gameStateSchema

export function makeGameJoinedMessage(
  game: Game,
  newPlayer: Player,
): MessageInterface<GameJoinedPayload> {
  return {
    type: MessageType.GAME_JOINED,
    payload: game.serializeForPlayer(newPlayer),
  }
}

export function isGameJoinedPayload(val: unknown): val is GameJoinedPayload {
  return !gameJoinedSchema.validate(val).error
}

registerMessage(MessageType.GAME_JOINED, gameJoinedSchema)
