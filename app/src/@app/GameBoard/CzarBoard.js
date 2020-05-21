import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col } from 'react-bootstrap'

import PlayerList from '@app/PlayerList'
import { gameStateShape } from '@app/state'

import BlackCard from './BlackCard'

const CzarBoard = ({ gameState, sendMessage }) => {
  const { players, round } = gameState
  const { startTime, timeLimit, blackCard } = round
  return (
    <Row>
      <Col>
        <h3>You&apos;re the card czar</h3>
        <p>Read this card aloud to the other players and wait for them to submit their cards</p>
        <BlackCard className="mt-3" startTime={startTime} timeLimit={timeLimit}>
          {blackCard.content}
        </BlackCard>
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
