import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'

import GameCard from './GameCard'
import PlayerList from './PlayerList'

const CARDS_IN_HAND = [
  { id: 0, text: 'Duis non sapien' },
  { id: 1, text: 'Quisque sollicitudin' },
  { id: 2, text: 'Aliquam' },
  { id: 3, text: 'Donec eu enim eu arcu condimentum sollicitudin' },
  { id: 4, text: 'Nam luctus lacus' },
  { id: 5, text: 'Pellentesque sed nibh elit' },
  { id: 6, text: 'Proin lobortis' },
]

const TIME_LIMIT = 60000
const WARNING_THRESHOLD = TIME_LIMIT / 3
const DANGER_THRESHOLD = TIME_LIMIT / 6

const GameBoard = ({ gameState }) => {
  const { players } = gameState.game
  const [selectedCardIndex, setSelectedCardIndex] = useState()
  const [startTime] = useState(Date.now())
  const [msLeft, setMsLeft] = useState(TIME_LIMIT)

  const secondsLeft = Math.floor(msLeft / 1000)

  useEffect(() => {
    if (msLeft > 0) {
      setTimeout(() => {
        const elapsed = Date.now() - startTime
        setMsLeft(Math.max(0, TIME_LIMIT - elapsed))
      }, 100)
    }
  }, [startTime, msLeft])

  const progressBarVariant =
    msLeft > WARNING_THRESHOLD ? 'primary' : msLeft > DANGER_THRESHOLD ? 'warning' : 'danger'

  return (
    <Container bg="light">
      <Row className="mt-4 h-100">
        <Col>
          <Row xs={1} md={2}>
            <Col className="mb-3 sticky-top">
              <GameCard className="h-100" variant="dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget pulvinar
                lacus
                {secondsLeft > 0 ? (
                  <ProgressBar
                    className="mt-3"
                    variant={progressBarVariant}
                    min={0}
                    max={TIME_LIMIT / 1000}
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
            {CARDS_IN_HAND.map(({ id, text }, index) => {
              const variant = index === selectedCardIndex ? 'selected' : 'light'
              return (
                <Col key={id} className="mb-3">
                  <GameCard
                    className="h-100"
                    variant={variant}
                    onSelectCard={() => setSelectedCardIndex(index)}
                  >
                    {text}
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
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default GameBoard
