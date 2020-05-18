import Joi from '@hapi/joi'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

interface GameCreatedPayload {
  gameId: string
  playerId: string
}

const gameCreatedSchema = Joi.object({
  gameId: Joi.string().required(),
  playerId: Joi.string().required(),
})

export function makeGameCreatedMessage(gameId: string, playerId: string): MessageInterface {
  return {
    type: MessageType.GAME_CREATED,
    payload: { gameId, playerId },
  }
}

export function isGameCreatedPayload(val: unknown): val is GameCreatedPayload {
  return !gameCreatedSchema.validate(val).error
}

registerMessage(MessageType.GAME_CREATED, gameCreatedSchema)
