import Joi from '@hapi/joi'

import { Game, Player, SerializedGame } from '@app/engine'
import { gameIdExists } from '@app/state'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'
import { gameSchema } from '../schemas'

interface GameJoinedPayload {
  playerId: string
  playerKey: string
  game: SerializedGame
}

const gameJoinedSchema = Joi.object({
  playerId: Joi.string().required(),
  playerKey: Joi.string().required(),
  game: gameSchema.required(),
})

export function makeGameJoinedMessage(
  game: Game,
  newPlayer: Player,
): MessageInterface<GameJoinedPayload> {
  return {
    type: MessageType.GAME_JOINED,
    payload: {
      playerId: newPlayer.id,
      playerKey: newPlayer.key,
      game: game.serialize(),
    },
  }
}

export function isGameJoinedPayload(val: unknown): val is GameJoinedPayload {
  return !gameJoinedSchema.validate(val).error
}

registerMessage(MessageType.GAME_JOINED, gameJoinedSchema)
