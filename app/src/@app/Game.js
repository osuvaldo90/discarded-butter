import { Router, navigate } from '@reach/router'
import { equals } from 'ramda'
import React, { useEffect, useReducer, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import CreateGame from './CreateGame'
import GameBoard from './GameBoard'
import GameLobby from './GameLobby'
import JoinGame from './JoinGame'
import JoinOrCreateGame from './JoinOrCreateGame'
import RejoinGame from './RejoinGame'
import { addPlayer, startRound } from './state'

const gameStateReducer = (state, message) => {
  console.log('RECV', message)

  const { type, payload } = message
  switch (type) {
    case 'GAME_CREATED':
    case 'GAME_JOINED':
      navigate(`/${payload.game.id}`)
      localStorage.setItem('playerKey', payload.playerKey)
      return payload

    case 'PLAYER_JOINED':
      return addPlayer(state, payload.player)

    case 'GAME_STARTED':
      return startRound(state, payload)

    case 'REJOIN_FAILED':
      navigate('/')
      localStorage.removeItem('playerKey')
      console.log('reset: ', type)
      return undefined

    case 'DISCONNECTED':
      localStorage.removeItem('playerKey')
      console.log('reset: ', type)
      return undefined
  }

  return state
}

const Game = () => {
  const [gameState, dispatchMessage] = useReducer(gameStateReducer)
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket('ws://localhost:8080')

  console.log('GAME STATE', gameState)

  // handle change in ready state
  useEffect(() => {
    if (readyState === ReadyState.CLOSING || readyState === ReadyState.CLOSED) {
      dispatchMessage({ type: 'DISCONNECTED' })
    }
  }, [readyState])

  // handle incoming messages
  useEffect(() => {
    if (lastJsonMessage) {
      dispatchMessage(lastJsonMessage)
    }
  }, [lastJsonMessage])

  const sendMessage = (message) => {
    console.log('SEND', message)
    sendJsonMessage(message)
  }

  const localPlayerKey = localStorage.getItem('playerKey')
  return (
    <Router>
      <JoinOrCreateGame path="/" />
      <JoinGame path="/join" sendMessage={sendMessage} />
      <CreateGame path="/create" sendMessage={sendMessage} />

      {gameState && !gameState.round && (
        <GameLobby path="/:gameId" gameState={gameState} sendMessage={sendMessage} />
      )}

      {gameState && gameState.round && (
        <GameBoard path="/:gameId" gameState={gameState} sendMessage={sendMessage} />
      )}

      {!gameState && !localPlayerKey && <JoinGame path="/:gameId" sendMessage={sendMessage} />}
      {!gameState && localPlayerKey && (
        <>
          <RejoinGame path="/" playerKey={localPlayerKey} sendMessage={sendMessage} />
          <RejoinGame path="/:gameId" playerKey={localPlayerKey} sendMessage={sendMessage} />
        </>
      )}
    </Router>
  )
}

Game.propTypes = {}

export default Game
