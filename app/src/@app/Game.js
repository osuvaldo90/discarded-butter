import { navigate, Router } from '@reach/router'
import React, { useEffect, useReducer } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import GameBoard from './GameBoard'
import Home from './Home'
import NewGame from './NewGame'
import { addPlayer, endRound, startRound, winnerChosen } from './state'

const gameStateReducer = (state, message) => {
  const { type, payload } = message
  switch (type) {
    case 'GAME_CREATED':
    case 'GAME_JOINED':
      navigate(`/${payload.gameId}`)
      localStorage.setItem('playerKey', payload.playerKey)
      localStorage.setItem('gameId', payload.gameId)
      return payload

    case 'PLAYER_JOINED':
      return addPlayer(state, payload.player)

    case 'ROUND_STARTED':
      return startRound(state, payload)

    case 'WINNER_CHOSEN':
      return winnerChosen(state, payload)

    case 'END_ROUND':
      return endRound(state, payload)

    case 'REJOIN_FAILED':
      navigate('/')
      localStorage.removeItem('playerKey')
      console.log('reset: ', type)
      return undefined

    case 'DISCONNECTED':
      navigate('/')
      localStorage.removeItem('playerKey')
      console.log('reset: ', type)
      return undefined

    default:
      console.error('unhandled message type: ', message)
  }

  return state
}

const Game = () => {
  const [gameState, dispatchMessage] = useReducer(gameStateReducer)
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket('ws://localhost:8080')

  // handle change in ready state
  useEffect(() => {
    console.log('READY STATE', readyState)
    if (readyState === ReadyState.CLOSING || readyState === ReadyState.CLOSED) {
      dispatchMessage({ type: 'DISCONNECTED' })
    }
  }, [readyState])

  // handle incoming messages
  useEffect(() => {
    if (lastJsonMessage) {
      console.log('RECV', lastJsonMessage)
      dispatchMessage(lastJsonMessage)
    }
  }, [lastJsonMessage])

  // log game state changes
  useEffect(() => {
    console.log('GAME STATE', gameState)
  }, [gameState])

  const sendMessage = (message) => {
    console.log('SEND', message)
    sendJsonMessage(message)
  }

  return (
    <Router>
      <Home path="/" sendMessage={sendMessage} />
      <NewGame path="new-game" sendMessage={sendMessage} />
      <GameBoard path="/:gameId" sendMessage={sendMessage} gameState={gameState} />
    </Router>
  )
}

Game.propTypes = {}

export default Game
