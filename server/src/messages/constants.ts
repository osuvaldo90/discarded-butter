import { values } from 'ramda'

export enum MessageType {
  CREATE_GAME = 'CREATE_GAME',
  GAME_CREATED = 'GAME_CREATED',
  JOIN_GAME = 'JOIN_GAME',
  GAME_JOINED = 'GAME_JOINED',
  REJOIN_GAME = 'REJOIN_GAME',
  REJOIN_FAILED = 'REJOIN_FAILED',
  PLAYER_JOINED = 'PLAYER_JOINED',
}

export const messageTypes = values(MessageType)
