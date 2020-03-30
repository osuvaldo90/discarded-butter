import PropTypes from 'prop-types'
import React, { useState } from 'react'
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

const GameBoard = ({ players }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState()

  return (
    <Container bg="light">
      <Row className="mt-4 h-100">
        <Col>
          <Row className="sticky-top bg-white border-bottom">
            <Col>
              <GameCard className="mb-2" variant="dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget pulvinar
                lacus
                <ProgressBar className="mt-3" min={0} max={60} now={47} animated />
              </GameCard>
            </Col>
          </Row>
          <Row className="d-md-none">
            <Col className="mt-3">
              <PlayerList players={players} opened={false} />
            </Col>
          </Row>
          <Row xs={1} md={2}>
            {CARDS_IN_HAND.map(({ id, text }, index) => {
              const variant = index === selectedCardIndex ? 'selected' : 'light'
              return (
                <Col className="mt-3" key={id}>
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
