import { nanoid } from 'nanoid'
import { pipe, map, range, find, propEq } from 'ramda'
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

export enum RoundStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface RoundWinner {
  player: SerializedPlayer
  submission: WhiteCard
}

export interface SerializedRound {
  id: string
  status: RoundStatus
  startTime: number
  timeLimit: number
  cardCzar: SerializedPlayer
  blackCard: BlackCard
  hand?: WhiteCard[]
  submissions?: WhiteCard[]
  winner?: RoundWinner
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
const TIME_LIMIT = 6000
const GRACE_PERIOD = 500

type OnEndRoundHandler = (round: Round, players: Player[]) => Promise<void>

export class Round {
  constructor(private cardCzar: Player, private blackCard: BlackCard) {
    this.id = nanoid()
    this.startTime = Date.now()
    this.timeLimit = TIME_LIMIT
  }

  getStatus(): RoundStatus {
    return this.status
  }

  getCardCzar(): Player {
    return this.cardCzar
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

  getSubmissions(): WhiteCard[] {
    return Array.from(this.submissionsByPlayerId.values())
  }

  getSubmissionsByPlayerId(): IterableIterator<[string, WhiteCard]> {
    return this.submissionsByPlayerId.entries()
  }

  setPlayerSubmission(player: Player, cardId: string): void {
    try {
      const hand = this.handsByPlayerId.get(player.id)
      if (!hand) {
        throw new VError(`no hand for player ${player.id}`)
      }

      const submittedCard = find(propEq('id', cardId), hand)
      if (!submittedCard) {
        throw new VError({ info: { hand } }, `card ${cardId} not in hand`)
      }

      this.submissionsByPlayerId.set(player.id, submittedCard)
    } catch (cause) {
      throw new VError({ info: { playerId: player, cardId } }, 'Round.setPlayerSubmission')
    }
  }

  setWinner(player: Player, submission: WhiteCard): void {
    this.winner = { player, submission }
  }

  serializeForPlayer(player: Player): SerializedRound {
    const submissions =
      this.status === RoundStatus.CLOSED
        ? Array.from(this.submissionsByPlayerId.values())
        : undefined

    return {
      id: this.id,
      status: this.status,
      startTime: this.startTime,
      timeLimit: this.timeLimit,
      cardCzar: serializePlayer(this.cardCzar),
      blackCard: this.blackCard,
      hand: this.getPlayerHand(player),
      submissions,
      winner: this.winner && {
        player: serializePlayer(this.winner.player),
        submission: this.winner.submission,
      },
    }
  }

  async endRound(onEndRound: OnEndRoundHandler, players: Player[]): Promise<void> {
    this.status = RoundStatus.CLOSED
    await onEndRound(this, players)
  }

  readonly id: string
  private status = RoundStatus.OPEN
  private handsByPlayerId = new Map<string, WhiteCard[]>()
  private submissionsByPlayerId = new Map<string, WhiteCard>()
  private startTime: number
  private timeLimit: number
  private winner?: { player: Player; submission: WhiteCard }
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

  getPlayerById(playerId: string): Player {
    const player = this.playersById.get(playerId)
    if (!player) {
      throw new VError({ info: { playerId } }, `Game.getPlayerById: player not found ${playerId}`)
    }
    return player
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

  startRound(onEndRound: OnEndRoundHandler): Round {
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

    setTimeout(() => newRound.endRound(onEndRound, this.players), TIME_LIMIT + GRACE_PERIOD)

    this.round = newRound
    return this.round
  }

  getRound(): Round | undefined {
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
