import Joi from '@hapi/joi'
import VError from 'verror'

import { Client } from '@app/client'
import { RoundStatus } from '@app/engine'
import { findGameByPlayerKey } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

interface SubmitWhiteCardPayload {
  playerKey: string
  roundId: string
  cardId: string
}

const submitWhiteCardSchema = Joi.object({
  playerKey: Joi.string().required(),
  roundId: Joi.string().required(),
  cardId: Joi.string().required(),
})

async function handleSubmitWhiteCard(
  client: Client,
  { playerKey, roundId, cardId }: SubmitWhiteCardPayload,
): Promise<void> {
  try {
    const game = findGameByPlayerKey(playerKey)
    const round = game.getRound()

    if (!round) {
      throw new VError('internal round not found')
    }

    if (round.id !== roundId) {
      throw new VError(
        { info: { internalRoundId: round.id } },
        `roundId does not match internal roundId`,
      )
    }

    if (round.getStatus() !== RoundStatus.OPEN) {
      throw new VError(`round ${roundId} is not open`)
    }

    const cardCzar = round.getCardCzar()
    const player = game.getPlayerByKey(playerKey)

    if (cardCzar.id === player.id) {
      throw new VError(
        { info: { cardCzarId: cardCzar.id, playerId: player.id } },
        'card czar cannot submit white cards',
      )
    }

    round.setPlayerSubmission(player, cardId)
  } catch (cause) {
    throw new VError({ cause, info: { playerKey, roundId, cardId } }, 'handleSubmitWhiteCard')
  }
}

registerMessage(MessageType.SUBMIT_WHITE_CARD, submitWhiteCardSchema, handleSubmitWhiteCard)
