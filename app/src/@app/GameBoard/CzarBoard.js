import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import React, { useState } from 'react'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import PlayerList from '@app/PlayerList'
import { gameStateShape } from '@app/state'

import BlackCard from './BlackCard'
import GameCard from './GameCard'

const CzarBoard = ({ gameState, sendMessage }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const { players, round, playerKey } = gameState
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
        playerKey: gameState.playerKey,
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
    <Row>
      <Col>
        {submissions && (
          <>
            <BlackCard className="mt-3" startTime={startTime} timeLimit={timeLimit}>
              {blackCard.content}
            </BlackCard>

            <Alert show={!!errorMessage} variant="danger">
              {errorMessage}
            </Alert>

            {submissions.map((submission, index) => {
              const variant = index === selectedCardIndex ? 'selected' : 'light'

              return (
                <GameCard
                  key={submission.id}
                  variant={variant}
                  onSelectCard={() => setSelectedCardIndex(index)}
                >
                  {submission.content}
                </GameCard>
              )
            })}

            <Button onClick={() => (winner ? startNextRound() : chooseWinner())}>
              {winner ? 'Next Round' : 'Choose Winner'}
            </Button>
          </>
        )}
        {!submissions && (
          <>
            <h3>You&apos;re the card czar</h3>
            <p>Read this card aloud to the other players and wait for them to submit their cards</p>
            <BlackCard className="mt-3" startTime={startTime} timeLimit={timeLimit}>
              {blackCard.content}
            </BlackCard>
          </>
        )}
      </Col>
      <Col className="d-none d-md-block" md={3}>
        <PlayerList players={players} opened={true} />
      </Col>
    </Row>
  )
}

CzarBoard.propTypes = {
  gameState: gameStateShape.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

export default CzarBoard
