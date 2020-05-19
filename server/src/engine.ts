import { nanoid } from 'nanoid'
import { pipe, map } from 'ramda'
import VError from 'verror'

import { Client } from './client'
import { playerSchema } from './messages/schemas'

export class Player {
  constructor(
    readonly client: Client,
    readonly id: string,
    readonly name: string,
    readonly key: string,
  ) {}
}

export interface SerializedPlayer {
  id: string
  name: string
}

export interface SerializedGame {
  id: string
  players: SerializedPlayer[]
}

export function serializePlayer(player: Player): SerializedPlayer {
  return {
    id: player.id,
    name: player.name,
  }
}

const serializePlayers = pipe(
  (playerMap: Map<string, Player>): Player[] => Array.from(playerMap.values()),
  map(serializePlayer),
)

export class Game {
  constructor(readonly id: string) {}

  addPlayer(player: Player): void {
    this.players.set(player.id, player)
    this.keyPlayers.set(player.key, player)
  }

  hasPlayerByKey(playerKey: string): boolean {
    return this.keyPlayers.has(playerKey)
  }

  getPlayerByKey(playerKey: string): Player {
    const player = this.keyPlayers.get(playerKey)
    if (!player) {
      throw new VError(
        { info: { playerKey } },
        `Game.getPlayerByKey: player not found ${playerKey}`,
      )
    }
    return player
  }

  getPlayers(): Player[] {
    return Array.from(this.players.values())
  }

  serialize(): SerializedGame {
    return {
      id: this.id,
      players: serializePlayers(this.players),
    }
  }

  private players = new Map<string, Player>()
  private keyPlayers = new Map<string, Player>()
}

export function createPlayer(client: Client, playerName: string): Player {
  const id = nanoid()
  const key = nanoid()
  return new Player(client, id, playerName, key)
}

interface CreateGamePayload {
  playerName: string
}

interface JoinGamePayload {
  gameId: string
  playerName: string
}
