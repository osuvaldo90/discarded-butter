import PropTypes from 'prop-types'
import { lensPath, over, append, set, lensProp } from 'ramda'

const playersLens = lensProp('players')
export const addPlayer = (state, player) => over(playersLens, append(player), state)

const roundLens = lensProp('round')
export const startRound = (state, round) => set(roundLens, round, state)

const winnerLens = lensPath(['round', 'winner'])
export const winnerChosen = (state, winner) => set(winnerLens, winner, state)

const submissionLens = lensPath(['round', 'submissions'])
export const endRound = (state, { submissions }) => set(submissionLens, submissions, state)

export const playerShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
})

export const blackCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  pick: PropTypes.number.isRequired,
  draw: PropTypes.number.isRequired,
})

const whiteCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
})

export const roundShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  blackCard: blackCardShape.isRequired,
  hand: PropTypes.arrayOf(whiteCardShape.isRequired),
  winner: PropTypes.shape({
    player: playerShape.isRequired,
    submission: whiteCardShape.isRequired,
  }),
})

export const gameStateShape = PropTypes.shape({
  gameId: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  playerKey: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerShape),
  round: roundShape,
})
