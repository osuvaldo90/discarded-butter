import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import PlayerList from '../PlayerList'
import { gameStateShape } from '../state'

import BlackCard from './BlackCard'
import GameCard from './GameCard'

const WhiteCard = ({ children, variant, onSelectCard, index }) => {
  return (
    <GameCard
      className="h-100"
      variant={variant}
      onSelectCard={onSelectCard && (() => onSelectCard(index))}
    >
      {children}
    </GameCard>
  )
}

WhiteCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['selected', 'light']),
  index: PropTypes.number,
  onSelectCard: PropTypes.func,
}

const NotCzarBoard = ({ gameState, sendMessage }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState()

  const { players, playerKey } = gameState
  const { hand, blackCard } = gameState.round

  const onSelectCard = (index) => {
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

  const startNextRound = () => {
    sendMessage({
      type: 'START_ROUND',
      payload: { playerKey },
    })
  }

  const { status, startTime, timeLimit, submissions, winner } = gameState.round
  const showTimer = status === 'OPEN'

  return (
    <>
      <Row className="h-100">
        <Col>
          <Row xs={1} md={2}>
            <Col className="mb-3 sticky-top">
              <BlackCard
                className="h-100"
                showTimer={showTimer}
                startTime={startTime}
                timeLimit={timeLimit}
              >
                {blackCard.content}
              </BlackCard>
            </Col>
            <Col className="mb-3 d-md-none">
              <PlayerList players={players} opened={false} />
            </Col>
            {winner && (
              <>
                <h4>The winner is</h4>
                <p>{winner.player.name}</p>
                <WhiteCard>{winner.submission.content}</WhiteCard>
                <Button onClick={startNextRound}>Next Round</Button>
              </>
            )}
            {submissions && !winner && (
              <>
                <h4>Time&apos;s up!</h4>
                <p>Hang on a sec while the card czar makes a decision.</p>
                {submissions.map(({ id, content }, index) => {
                  return (
                    <Col key={id} className="mb-3">
                      <WhiteCard index={index}>{content}</WhiteCard>
                    </Col>
                  )
                })}
              </>
            )}
            {!submissions &&
              hand &&
              hand.map(({ id, content }, index) => {
                const variant = index === selectedCardIndex ? 'selected' : 'light'

                return (
                  <WhiteCard key={id} index={index} onSelectCard={onSelectCard} variant={variant}>
                    {content}
                  </WhiteCard>
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
