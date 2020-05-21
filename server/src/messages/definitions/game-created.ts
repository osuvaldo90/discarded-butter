import Joi from '@hapi/joi'

import { Game, Player, SerializedGame } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'
import { gameSchema } from '../schemas'

export interface GameCreatedPayload {
  playerId: string
  playerKey: string
  game: SerializedGame
}

export const gameCreatedSchema = Joi.object({
  playerId: Joi.string().required(),
  playerKey: Joi.string().required(),
  game: gameSchema.required(),
})

export function makeGameCreatedMessage(
  game: Game,
  player: Player,
): MessageInterface<GameCreatedPayload> {
  return {
    type: MessageType.GAME_CREATED,
    payload: {
      playerId: player.id,
      playerKey: player.key,
      game: game.serialize(),
    },
  }
}

export function isGameCreatedPayload(val: unknown): val is GameCreatedPayload {
  return !gameCreatedSchema.validate(val).error
}

registerMessage(MessageType.GAME_CREATED, gameCreatedSchema)
