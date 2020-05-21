import Joi from '@hapi/joi'

import { Game, Player, WhiteCard, BlackCard } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'
import { gameSchema } from '../schemas'

import { whiteCardSchema, blackCardSchema } from './common'
import { GameCreatedPayload } from './game-created'

interface Round {
  blackCard: BlackCard
  hand: WhiteCard[]
}

interface GameJoinedPayload extends GameCreatedPayload {
  round?: Round
}

const roundSchema = Joi.object({
  blackCard: blackCardSchema.required(),
  hand: Joi.array().items(whiteCardSchema.required()).required(),
})

const gameJoinedSchema = Joi.object({
  playerId: Joi.string().required(),
  playerKey: Joi.string().required(),
  game: gameSchema.required(),
  round: roundSchema,
})

export function makeGameJoinedMessage(
  game: Game,
  newPlayer: Player,
  round?: Round,
): MessageInterface<GameJoinedPayload> {
  return {
    type: MessageType.GAME_JOINED,
    payload: {
      playerId: newPlayer.id,
      playerKey: newPlayer.key,
      game: game.serialize(),
      round,
    },
  }
}

export function isGameJoinedPayload(val: unknown): val is GameJoinedPayload {
  return !gameJoinedSchema.validate(val).error
}

registerMessage(MessageType.GAME_JOINED, gameJoinedSchema)
