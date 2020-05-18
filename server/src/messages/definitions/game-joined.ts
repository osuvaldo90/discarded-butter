import Joi from '@hapi/joi'

import { Game, Player } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

interface GameJoinedPlayer {
  id: string
  name: string
}

interface GameJoinedPayload {
  gameId: string
  playerId: string
  players: GameJoinedPlayer[]
}

const playerSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
})

const gameJoinedSchema = Joi.object({
  gameId: Joi.string().required(),
  playerId: Joi.string().required(),
  players: Joi.array().items(playerSchema),
})

export function makeGameJoinedMessage(game: Game, newPlayer: Player): MessageInterface {
  const players = game.getPlayers()

  return {
    type: MessageType.GAME_JOINED,
    payload: {
      gameId: game.id,
      playerId: newPlayer.id,
      players: players.map((player) => ({ id: player.id, name: player.name })),
    },
  }
}

export function isGameJoinedPayload(val: unknown): val is GameJoinedPayload {
  return !gameJoinedSchema.validate(val).error
}

registerMessage(MessageType.GAME_JOINED, gameJoinedSchema)
