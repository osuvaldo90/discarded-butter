import VError from 'verror'

import { Game, Player } from './engine'

const games = new Map<string, Game>()
const playerGames = new Map<string, Game>()

export function gameIdExists(gameId: string): boolean {
  return games.has(gameId)
}

export function storeNewGame(game: Game, firstPlayer: Player): void {
  games.set(game.id, game)
  playerGames.set(firstPlayer.key, game)
}

export function findGameById(gameId: string): Game {
  const game = games.get(gameId)
  if (!game) {
    throw new VError({ info: { gameId } }, `findGameById: game not found: ${gameId}`)
  }
  return game
}

export function addPlayerToGame(game: Game, player: Player): void {
  playerGames.set(player.key, game)
}

export function findGameByPlayerKey(playerKey: string): Game {
  const game = playerGames.get(playerKey)
  if (!game) {
    throw new VError({ info: { playerKey } }, `findGameByPlayerKey: game not found: ${playerKey}`)
  }
  return game
}
