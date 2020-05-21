import { lensPath, over, append, set, lensProp } from 'ramda'

const playersLens = lensPath(['game', 'players'])
export const addPlayer = (state, player) => over(playersLens, append(player), state)

const roundLens = lensProp('round')
export const startRound = (state, round) => set(roundLens, round, state)
