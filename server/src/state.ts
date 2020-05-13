import VError from 'verror'

import { Game } from './game'

const games = new Map<string, Game>()

export function gameIdExists(gameId: string): boolean {
  return games.has(gameId)
}

export function storeGame(game: Game): void {
  games.set(game.id, game)
}

export function findGame(gameId: string): Game {
  const game = games.get(gameId)
  if (!game) {
    throw new VError({ info: { gameId } }, 'game not found')
  }
  return game
}
