import Joi from '@hapi/joi'

import { SerializedPlayer, Player, serializePlayer } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { playerSchema } from './common'

interface PlayerJoinedPayload {
  player: SerializedPlayer
}

const playerJoinedSchema = Joi.object({
  player: playerSchema.required(),
})

export function makePlayerJoinedMessage(player: Player): MessageInterface<PlayerJoinedPayload> {
  return {
    type: MessageType.PLAYER_JOINED,
    payload: { player: serializePlayer(player) },
  }
}

registerMessage(MessageType.PLAYER_JOINED, playerJoinedSchema)
