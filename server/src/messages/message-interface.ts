import { MessageType } from './constants'

export interface MessageInterface<T = object> {
  readonly type: MessageType
  readonly payload: T
}
