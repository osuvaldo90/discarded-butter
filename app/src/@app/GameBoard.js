import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'

import GameCard from './GameCard'
import PlayerList from './PlayerList'
import { gameStateShape } from './state'

const WARNING_THRESHOLD_SECONDS = 5
const DANGER_THRESHOLD_SECONDS = 3

const GameBoard = ({ gameState, sendMessage }) => {
  const { startTime, timeLimit } = gameState.round

  const { players } = gameState
  const [selectedCardIndex, setSelectedCardIndex] = useState()
  const [msLeft, setMsLeft] = useState(timeLimit)

  const secondsLeft = Math.floor(msLeft / 1000)

  useEffect(() => {
    if (msLeft > 0) {
      setTimeout(() => {
        const elapsed = Date.now() - startTime
        setMsLeft(Math.max(0, timeLimit - elapsed))
      }, 100)
    }
  }, [startTime, timeLimit, msLeft])

  const { hand, blackCard } = gameState.round
  const onCardSelected = (index) => {
    setSelectedCardIndex(index)
    const selectedCard = hand[index]
    sendMessage({
      type: 'SUBMIT_WHITE_CARD',
      payload: {
        playerKey: gameState.playerKey,
        roundId: gameState.round.id,
        cardId: selectedCard.id,
      },
    })
  }

  const progressBarVariant =
    secondsLeft > WARNING_THRESHOLD_SECONDS
      ? 'primary'
      : secondsLeft > DANGER_THRESHOLD_SECONDS
      ? 'warning'
      : 'danger'

  return (
    <Container bg="light">
      <Row className="mt-4 h-100">
        <Col>
          <Row xs={1} md={2}>
            <Col className="mb-3 sticky-top">
              <GameCard className="h-100" variant="dark">
                {blackCard.content}
                {secondsLeft > 0 ? (
                  <ProgressBar
                    className="mt-3"
                    variant={progressBarVariant}
                    min={0}
                    max={timeLimit / 1000}
                    now={secondsLeft}
                    label={`${secondsLeft}s`}
                    animated
                  />
                ) : (
                  <div className="mt-2 text-white-50">Time&apos;s up!</div>
                )}
              </GameCard>
            </Col>
            <Col className="mb-3 d-md-none">
              <PlayerList players={players} opened={false} />
            </Col>
            {hand &&
              hand.map(({ id, content }, index) => {
                const variant = index === selectedCardIndex ? 'selected' : 'light'
                return (
                  <Col key={id} className="mb-3">
                    <GameCard
                      className="h-100"
                      variant={variant}
                      onSelectCard={() => onCardSelected(index)}
                    >
                      {content}
                    </GameCard>
                  </Col>
                )
              })}
          </Row>
        </Col>
        <Col className="d-none d-md-block" md={3}>
          <PlayerList players={players} opened={true} />
        </Col>
      </Row>
    </Container>
  )
}

GameBoard.propTypes = {
  gameState: gameStateShape.isRequired,
  sendMessage: PropTypes.func,
}

export default GameBoard
