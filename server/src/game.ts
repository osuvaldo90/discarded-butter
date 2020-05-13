import { nanoid } from 'nanoid'

class Player {
  constructor(readonly id: string, readonly playerName: string, readonly key: string) {}
}

export class Game {
  constructor(readonly id: string) {}

  addPlayer(player: Player): void {
    this.players.set(player.id, player)
  }

  getPlayers(): Player[] {
    return Array.from(this.players.values())
  }

  private players = new Map<string, Player>()
}

export function createPlayer(playerName: string): Player {
  const id = nanoid()
  const key = nanoid()
  return new Player(id, playerName, key)
}

interface CreateGamePayload {
  playerName: string
}

interface JoinGamePayload {
  gameId: string
  playerName: string
}
