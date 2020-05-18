import { nanoid } from 'nanoid'

export class Player {
  constructor(readonly id: string, readonly name: string, private key: string) {}
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
