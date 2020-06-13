import Joi from '@hapi/joi'

import { WhiteCard, Round, RoundStatus } from '@app/engine'
import { submissionsSchema, roundStatusSchema } from '@app/messages/definitions/common'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

interface EndRoundPayload {
  status: RoundStatus
  submissions: WhiteCard[]
}

const roundOverSchema = Joi.object({
  status: roundStatusSchema.required(),
  submissions: submissionsSchema,
})

export function makeEndRoundMessage(round: Round): MessageInterface<EndRoundPayload> {
  return {
    type: MessageType.END_ROUND,
    payload: {
      status: round.getStatus(),
      submissions: round.getSubmissions(),
    },
  }
}

registerMessage(MessageType.END_ROUND, roundOverSchema)
