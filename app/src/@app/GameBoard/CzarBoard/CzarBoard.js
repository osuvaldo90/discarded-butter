import PropTypes from 'prop-types'
import { cond, isNil, T } from 'ramda'
import React from 'react'

import { playerShape, roundShape } from '@app/state'

import { isNilOrEmpty } from '@lib/util'

import WinnerChosen from '../WinnerChosen'

import ChooseWinner from './ChooseWinner'
import WaitForSubmissions from './WaitForSubmissions'

const CzarBoard = ({ sendMessage, players, round, playerKey }) => {
  const { startTime, timeLimit, blackCard, submissions, winner } = round

  return cond([
    [
      () => isNilOrEmpty(submissions),
      () => (
        <WaitForSubmissions startTime={startTime} timeLimit={timeLimit} blackCard={blackCard} />
      ),
    ],
    [
      () => isNil(winner),
      () => <ChooseWinner sendMessage={sendMessage} playerKey={playerKey} round={round} />,
    ],
    [T, () => <WinnerChosen sendMessage={sendMessage} playerKey={playerKey} round={round} />],
  ])()
}

CzarBoard.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  playerKey: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired,
  round: roundShape.isRequired,
}

export default CzarBoard
