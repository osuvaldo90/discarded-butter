import { nanoid } from 'nanoid'
import { pipe, map, range } from 'ramda'
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

export interface SerializedPlayer {
  id: string
  name: string
}

export interface SerializedRound {
  id: string
  startTime: number
  timeLimit: number
  cardCzar: SerializedPlayer
  blackCard: BlackCard
  hand?: WhiteCard[]
}

export interface SerializedGameState {
  gameId: string
  playerId: string
  playerKey: string
  players: SerializedPlayer[]
  round?: SerializedRound
}

export interface SerializedCurrentPlayer {
  id: string
  key: string
  name: string
}

export function serializePlayer(player: Player): SerializedPlayer {
  return {
    id: player.id,
    name: player.name,
  }
}

const serializePlayers = map(serializePlayer)

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
const TIME_LIMIT = 60000

export class Round {
  constructor(private cardCzar: Player, private blackCard: BlackCard) {
    this.id = nanoid()
    this.startTime = Date.now()
    this.timeLimit = TIME_LIMIT
  }

  getBlackCard(): BlackCard {
    return this.blackCard
  }

  getPlayerHand(player: Player): WhiteCard[] | undefined {
    return this.handsByPlayerId.get(player.id)
  }

  setPlayerHand(player: Player, cards: WhiteCard[]): void {
    this.handsByPlayerId.set(player.id, cards)
  }

  serializeForPlayer(player: Player): SerializedRound {
    return {
      id: this.id,
      startTime: this.startTime,
      timeLimit: this.timeLimit,
      cardCzar: serializePlayer(this.cardCzar),
      blackCard: this.blackCard,
      hand: this.getPlayerHand(player),
    }
  }

  readonly id: string
  private handsByPlayerId = new Map<string, WhiteCard[]>()
  private startTime: number
  private timeLimit: number
}

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

export class Game {
  constructor(readonly id: string, firstPlayer: Player) {
    this.addPlayer(firstPlayer)
  }

  addPlayer(player: Player): void {
    this.players.push(player)
    this.playersById.set(player.id, player)
    this.playersByKey.set(player.key, player)
  }

  hasPlayerByKey(playerKey: string): boolean {
    return this.playersByKey.has(playerKey)
  }

  getPlayerByKey(playerKey: string): Player {
    const player = this.playersByKey.get(playerKey)
    if (!player) {
      throw new VError(
        { info: { playerKey } },
        `Game.getPlayerByKey: player not found ${playerKey}`,
      )
    }
    return player
  }

  getPlayers(): Player[] {
    return this.players
  }

  startRound(): Round {
    const czar = this.players[this.nextRoundCzarPlayerIndex]
    const newRound = new Round(czar, drawBlackCard())
    for (const player of this.playersById.values()) {
      newRound.setPlayerHand(player, drawHand())
    }

    if (this.nextRoundCzarPlayerIndex + 1 === this.players.length) {
      this.nextRoundCzarPlayerIndex = 0
    } else {
      this.nextRoundCzarPlayerIndex += 1
    }

    this.round = newRound
    return this.round
  }

  serializeForPlayer(player: Player): SerializedGameState {
    return {
      gameId: this.id,
      playerId: player.id,
      playerKey: player.key,
      players: serializePlayers(this.players),
      round: this.round && this.round.serializeForPlayer(player),
    }
  }

  private players: Player[] = []
  private playersById = new Map<string, Player>()
  private playersByKey = new Map<string, Player>()
  private nextRoundCzarPlayerIndex = 0
  private round?: Round
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
