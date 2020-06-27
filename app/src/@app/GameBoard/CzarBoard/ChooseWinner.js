import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

import SingleColumnLayout from '@app/layout/SingleColumnLayout'
import { roundShape } from '@app/state'

import BlackCard from '../BlackCard'
import GameCard from '../GameCard'

const ChooseWinner = ({ sendMessage, playerKey, round }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const { startTime, timeLimit, blackCard, submissions, winner } = round

  const chooseWinner = () => {
    if (isNil(selectedCardIndex)) {
      setErrorMessage('Click a white card to choose a winner')
      return
    }

    setErrorMessage(undefined)
    sendMessage({
      type: 'CHOOSE_WINNER',
      payload: {
        playerKey: playerKey,
        cardId: submissions[selectedCardIndex].id,
      },
    })
  }

  const startNextRound = () => {
    sendMessage({
      type: 'START_ROUND',
      payload: { playerKey },
    })
  }

  return (
    <SingleColumnLayout>
      <BlackCard className="mb-3" startTime={startTime} timeLimit={timeLimit}>
        {blackCard.content}
      </BlackCard>

      <Alert show={!!errorMessage} variant="danger">
        {errorMessage}
      </Alert>

      {submissions.map((submission, index) => {
        const variant = index === selectedCardIndex ? 'selected' : 'light'

        return (
          <GameCard
            className="mb-3"
            key={submission.id}
            variant={variant}
            onSelectCard={() => setSelectedCardIndex(index)}
          >
            {submission.content}
          </GameCard>
        )
      })}

      <Button block onClick={() => (winner ? startNextRound() : chooseWinner())}>
        {winner ? 'Next Round' : 'Choose Winner'}
      </Button>
    </SingleColumnLayout>
  )
}

ChooseWinner.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  playerKey: PropTypes.string.isRequired,
  round: roundShape.isRequired,
}

export default ChooseWinner
