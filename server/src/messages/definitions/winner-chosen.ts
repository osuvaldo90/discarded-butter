import { Player, WhiteCard, serializePlayer, RoundWinner } from '@app/engine'

import { MessageType } from '../constants'
import { MessageInterface } from '../message-interface'
import { registerMessage } from '../registry'

import { roundWinnerSchema } from './common'

type WinnerChosenPayload = RoundWinner

const winnerChosenSchema = roundWinnerSchema

export function makeWinnerChosenMessage(
  winner: Player,
  submission: WhiteCard,
): MessageInterface<WinnerChosenPayload> {
  return {
    type: MessageType.WINNER_CHOSEN,
    payload: {
      player: serializePlayer(winner),
      submission,
    },
  }
}

registerMessage(MessageType.WINNER_CHOSEN, winnerChosenSchema)
