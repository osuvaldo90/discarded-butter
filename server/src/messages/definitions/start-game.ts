import Joi from '@hapi/joi'
import { nanoid } from 'nanoid'
import { range, pipe, map } from 'ramda'

import { Client } from '@app/client'
import { BlackCard } from '@app/engine'
import { findGameByPlayerKey } from '@app/state'

import { MessageType } from '../constants'
import { registerMessage } from '../registry'

import { makeGameStartedMessage } from './game-started'

interface StartGamePayload {
  playerKey: string
}

const startGamePayloadSchema = Joi.object({
  playerKey: Joi.string().required(),
})

function drawBlackCard(): BlackCard {
  return {
    id: nanoid(),
    content: 'something _____ something',
    pick: 1,
    draw: 1,
  }
}

const drawHand = pipe(
  () => range(0, 7),
  map((i) => ({ id: nanoid(), content: `white card ${i}` })),
)

async function handleStartGame(client: Client, { playerKey }: StartGamePayload): Promise<void> {
  const game = findGameByPlayerKey(playerKey)
  const players = game.getPlayers()

  const blackCard = drawBlackCard()
  game.setBlackCard(blackCard)

  const promises: Promise<void>[] = []

  for (const player of players) {
    const hand = drawHand()
    game.setPlayerHand(player, hand)

    const message = makeGameStartedMessage(blackCard, hand)
    promises.push(player.client.send(message))
  }

  await Promise.all(promises)
}

registerMessage(MessageType.START_GAME, startGamePayloadSchema, handleStartGame)
