import PropTypes from 'prop-types'
import { lensPath, over, append, set, lensProp } from 'ramda'

const playersLens = lensPath(['players'])
export const addPlayer = (state, player) => over(playersLens, append(player), state)

const roundLens = lensProp('round')
export const startRound = (state, round) => set(roundLens, round, state)

const playerShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
})

const blackCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
})

const whiteCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  pick: PropTypes.number.isRequired,
  draw: PropTypes.number.isRequired,
})

const roundShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  blackCard: PropTypes.shape(blackCardShape).isRequired,
  hand: PropTypes.arrayOf(whiteCardShape.isRequired),
})

export const gameStateShape = PropTypes.shape({
  gameId: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  playerKey: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerShape),
  round: PropTypes.shape(roundShape),
})
