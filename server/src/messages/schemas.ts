import Joi from '@hapi/joi'

export const playerSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
})

export const gameSchema = Joi.object({
  id: Joi.string().required(),
  players: Joi.array().items(playerSchema.required()),
})
