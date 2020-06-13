import Joi from '@hapi/joi'
import VError from 'verror'

import { Client } from '@app/client'
import { WhiteCard } from '@app/engine'
import { findGameByPlayerKey } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

import { makeWinnerChosenMessage } from './winner-chosen'

interface ChooseWinnerPayload {
  playerKey: string
  cardId: string
}

const chooseWinnerSchema = Joi.object({
  playerKey: Joi.string().required(),
  cardId: Joi.string().required(),
})

function findWinner(
  it: IterableIterator<[string, WhiteCard]>,
  cardId: string,
): { winnerId: string; submission: WhiteCard } {
  for (const [player, submission] of it) {
    if (submission.id === cardId) {
      return { winnerId: player, submission }
    }
  }

  throw new VError(`findWinner: card ID ${cardId} not found in submissions`)
}

async function handleChooseWinner(
  client: Client,
  { playerKey, cardId }: ChooseWinnerPayload,
): Promise<void> {
  try {
    const game = await findGameByPlayerKey(playerKey)

    const round = game.getRound()

    if (!round) {
      throw new VError('no active round')
    }

    const submissionsByPlayerId = round.getSubmissionsByPlayerId()
    const { winnerId, submission } = findWinner(submissionsByPlayerId, cardId)
    const winner = game.getPlayerById(winnerId)

    round.setWinner(winner, submission)

    await Promise.all(
      game
        .getPlayers()
        .map((player) => player.client.send(makeWinnerChosenMessage(winner, submission))),
    )
  } catch (cause) {
    throw new VError({ cause, info: { playerKey, cardId } }, 'handleChooseWinner')
  }
}

registerMessage(MessageType.CHOOSE_WINNER, chooseWinnerSchema, handleChooseWinner)
