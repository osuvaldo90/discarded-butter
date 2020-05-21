import Joi from '@hapi/joi'

import { BlackCard, WhiteCard } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { blackCardSchema, whiteCardSchema } from './common'

interface GameStartedPayload {
  blackCard: BlackCard
  hand: WhiteCard[]
}

const gameStartedPayloadSchema = Joi.object({
  blackCard: blackCardSchema.required(),
  hand: Joi.array().items(whiteCardSchema),
})

export function makeGameStartedMessage(
  blackCard: BlackCard,
  hand: WhiteCard[],
): MessageInterface<GameStartedPayload> {
  return {
    type: MessageType.GAME_STARTED,
    payload: {
      blackCard,
      hand,
    },
  }
}

registerMessage(MessageType.GAME_STARTED, gameStartedPayloadSchema)
