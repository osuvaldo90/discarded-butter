import { nanoid } from 'nanoid'
import { pipe, map } from 'ramda'
import VError from 'verror'

import { Client } from './client'

export class Player {
  constructor(client: Client, readonly id: string, readonly name: string, readonly key: string) {
    this._client = client
  }

  get client(): Client {
    return this._client
  }

  updateClient(client: Client): void {
    this._client.terminate()
    this._client = client
  }

  private _client: Client
}

export interface SerializedCurrentPlayer {
  id: string
  key: string
  name: string
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

export interface WhiteCard {
  id: string
  content: string
}

export interface BlackCard {
  id: string
  content: string
  pick: number
  draw: number
}

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

  setBlackCard(card: BlackCard): void {
    this.blackCard = card
  }

  setPlayerHand(player: Player, cards: WhiteCard[]): void {
    this.playerHands.set(player.id, cards)
  }

  serialize(): SerializedGame {
    return {
      id: this.id,
      players: serializePlayers(this.players),
    }
  }

  private players = new Map<string, Player>()
  private keyPlayers = new Map<string, Player>()
  private blackCard?: BlackCard
  private playerHands = new Map<string, WhiteCard[]>()
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
