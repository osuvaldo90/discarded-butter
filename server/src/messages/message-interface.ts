import { MessageType } from './constants'

export interface MessageInterface {
  readonly type: MessageType
  readonly payload: object
}
