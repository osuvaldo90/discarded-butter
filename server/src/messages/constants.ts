import R from 'ramda'

export enum MessageType {
  CREATE_GAME = 'CREATE_GAME',
  GAME_CREATED = 'GAME_CREATED',
  JOIN_GAME = 'JOIN_GAME',
  GAME_JOINED = 'GAME_JOINED',
}

export const messageTypes = R.values(MessageType)
