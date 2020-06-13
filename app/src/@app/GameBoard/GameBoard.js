import PropTypes from 'prop-types'
import React from 'react'
import { Container } from 'react-bootstrap'

import { gameStateShape } from '../state'

import CzarBoard from './CzarBoard'
import NotCzarBoard from './NotCzarBoard'

const GameBoard = ({ gameState, sendMessage }) => {
  const playerIsCardCzar = gameState.round.cardCzar.id === gameState.playerId
  return (
    <Container className="pt-4">
      {playerIsCardCzar && <CzarBoard gameState={gameState} sendMessage={sendMessage} />}
      {!playerIsCardCzar && <NotCzarBoard gameState={gameState} sendMessage={sendMessage} />}
    </Container>
  )
}

GameBoard.propTypes = {
  gameState: gameStateShape.isRequired,
  sendMessage: PropTypes.func,
}

export default GameBoard
