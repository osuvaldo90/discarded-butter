import Joi from '@hapi/joi'

import { Game } from '@app/game'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

interface Player {
  id: string
  name: string
}

interface GameJoined {
  players: Player[]
}

const playerSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
})

const gameJoinedSchema = Joi.object({
  gameId: Joi.string().required(),
  players: Joi.array().items(playerSchema),
})

export function createGameJoinedMessage(game: Game): MessageInterface {
  const players = game.getPlayers()
  console.log(players)
  return {
    type: MessageType.GAME_JOINED,
    payload: { players },
  }
}

registerMessage(MessageType.GAME_JOINED, gameJoinedSchema)
