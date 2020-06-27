import { either, isNil, isEmpty } from 'ramda'

export const isNilOrEmpty = either(isNil, isEmpty)
