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
