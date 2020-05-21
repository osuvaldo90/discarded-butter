import Joi from '@hapi/joi'

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

export const roundSchema = Joi.object({
  id: Joi.string().required(),
  startTime: Joi.number().required(),
  timeLimit: Joi.number().required(),
  cardCzar: playerSchema.required(),
  blackCard: blackCardSchema.required(),
  hand: Joi.array().items(whiteCardSchema.required()),
})

export const gameStateSchema = Joi.object({
  gameId: Joi.string().required(),
  playerId: Joi.string().required(),
  playerKey: Joi.string().required(),
  players: Joi.array().items(playerSchema.required()).required(),
  round: roundSchema,
})
