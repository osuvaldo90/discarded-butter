import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'

import Title from '@app/Title'
import SingleColumnLayout from '@app/layout/SingleColumnLayout'
import { roundShape } from '@app/state'

import BlackCard from './BlackCard'
import WhiteCard from './WhiteCard'

const WinnerChosen = ({ sendMessage, playerKey, round }) => {
  const { blackCard, status, startTime, timeLimit, winner } = round
  const showTimer = status === 'OPEN'

  const startNextRound = () => {
    sendMessage({
      type: 'START_ROUND',
      payload: { playerKey },
    })
  }

  return (
    <SingleColumnLayout>
      <Title>The winner is {winner.player.name}</Title>

      <BlackCard className="mb-3" showTimer={showTimer} startTime={startTime} timeLimit={timeLimit}>
        {/* {blackCard.content} */}
        <p>{blackCard.content}</p>
      </BlackCard>

      <WhiteCard className="mb-3">{winner.submission.content}</WhiteCard>

      <Button block onClick={startNextRound}>
        Next Round
      </Button>
    </SingleColumnLayout>
  )
}

WinnerChosen.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  playerKey: PropTypes.string.isRequired,
  round: roundShape.isRequired,
}

export default WinnerChosen
