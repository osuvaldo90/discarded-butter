import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import React, { useCallback, useEffect } from 'react'

import { gameStateShape } from '../state'

import CzarBoard from './CzarBoard'
import JoinGame from './JoinGame'
import Lobby from './Lobby'
import NotCzarBoard from './NotCzarBoard'

const GameBoard = ({ gameState, sendMessage }) => {
  const sendMessageCallback = useCallback(sendMessage, [])

  const { gameId, playerId, players, playerKey, round } = gameState || {}
  const { cardCzar = {} } = round || {}
  const playerIsCardCzar = cardCzar.id === playerId

  useEffect(() => {
    console.log('GAME BOARD EFFECT')
    const storedPlayerKey = localStorage.getItem('playerKey')
    const storedGameId = localStorage.getItem('gameId')
    if (isNil(gameState) && storedGameId && storedPlayerKey) {
      sendMessageCallback({
        type: 'REJOIN_GAME',
        payload: { playerKey: storedPlayerKey, gameId: storedGameId },
      })
    }
  }, [gameState, sendMessageCallback])

  if (isNil(gameState)) {
    return <JoinGame sendMessage={sendMessage} gameId={gameId} />
  }

  if (round && playerIsCardCzar) {
    return (
      <CzarBoard
        sendMessage={sendMessageCallback}
        players={players}
        round={round}
        playerKey={playerKey}
      />
    )
  }

  if (round && !playerIsCardCzar) {
    return <NotCzarBoard sendMessage={sendMessage} playerKey={playerKey} round={round} />
  }

  return <Lobby sendMessage={sendMessage} gameId={gameId} players={players} playerKey={playerKey} />
}

GameBoard.propTypes = {
  gameState: gameStateShape,
  sendMessage: PropTypes.func,
}

export default GameBoard
