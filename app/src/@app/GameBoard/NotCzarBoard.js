import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import PlayerList from '../PlayerList'
import { gameStateShape } from '../state'

import BlackCard from './BlackCard'
import GameCard from './GameCard'

const NotCzarBoard = ({ gameState, sendMessage }) => {
  const { players } = gameState
  const [selectedCardIndex, setSelectedCardIndex] = useState()

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

  const { startTime, timeLimit } = gameState.round

  return (
    <>
      <Row className="h-100">
        <Col>
          <Row xs={1} md={2}>
            <Col className="mb-3 sticky-top">
              <BlackCard className="h-100" startTime={startTime} timeLimit={timeLimit}>
                {blackCard.content}
              </BlackCard>
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
    </>
  )
}

NotCzarBoard.propTypes = {
  gameState: gameStateShape.isRequired,
  sendMessage: PropTypes.func,
}

export default NotCzarBoard
