import Joi from '@hapi/joi'
import { values } from 'ramda'

import { RoundStatus } from '@app/engine'

export const blackCardSchema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().required(),
  pick: Joi.number().required(),
  draw: Joi.number().required(),
})

export const whiteCardSchema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().required(),
})

export const playerSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
})

export const submissionsSchema = Joi.array()
  .items(whiteCardSchema)
  .when('status', {
    is: Joi.string().valid(RoundStatus.CLOSED),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  })

export const roundStatusSchema = Joi.string()
  .valid(...values(RoundStatus))
  .required()

export const roundWinnerSchema = Joi.object({
  player: playerSchema.required(),
  submission: whiteCardSchema.required(),
})

export const roundSchema = Joi.object({
  id: Joi.string().required(),
  status: roundStatusSchema.required(),
  startTime: Joi.number().required(),
  timeLimit: Joi.number().required(),
  cardCzar: playerSchema.required(),
  blackCard: blackCardSchema.required(),
  hand: Joi.array().items(whiteCardSchema.required()),
  submissions: submissionsSchema,
  winner: roundWinnerSchema,
})

export const gameStateSchema = Joi.object({
  gameId: Joi.string().required(),
  playerId: Joi.string().required(),
  playerKey: Joi.string().required(),
  players: Joi.array().items(playerSchema.required()).required(),
  round: roundSchema,
})
