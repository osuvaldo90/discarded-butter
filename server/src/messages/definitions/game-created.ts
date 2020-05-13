import Joi from '@hapi/joi'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

interface GameCreatedPayload {
  gameId: string
}

const gameCreatedSchema = Joi.object({
  gameId: Joi.string().required(),
})

export function makeGameCreatedMessage(payload: GameCreatedPayload): MessageInterface {
  return {
    type: MessageType.GAME_CREATED,
    payload,
  }
}

registerMessage(MessageType.GAME_CREATED, gameCreatedSchema)
