import { Router, navigate } from '@reach/router'
import { isNil } from 'ramda'
import React, { useEffect, useReducer, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import CreateGame from './CreateGame'
import GameLobby from './GameLobby'
import JoinGame from './JoinGame'
import JoinOrCreateGame from './JoinOrCreateGame'
import RejoinGame from './RejoinGame'

const gameStateReducer = (state, message) => {
  console.log('recv', message)
  const { type, payload } = message
  switch (type) {
    case 'GAME_CREATED':
      navigate(`/${payload.game.id}`)
      localStorage.setItem('playerKey', payload.playerKey)
      return payload

    case 'GAME_JOINED':
      localStorage.setItem('playerKey', payload.playerKey)
      return payload

    case 'PLAYER_JOINED': {
      return {
        ...state,
        game: {
          ...state.game,
          players: [...state.game.players, payload.player],
        },
      }
    }

    case 'REJOIN_FAILED':
    case 'DISCONNECTED':
      navigate('/')
      localStorage.setItem('playerKey', undefined)
      console.log('reset: ', type)
      return undefined
  }
}

const Game = () => {
  const [gameState, dispatchMessage] = useReducer(gameStateReducer)
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket('ws://localhost:8080')

  console.log('GAME STATE', gameState)

  // handle change in ready state
  useEffect(() => {
    console.log('ready state', readyState)

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

  const onCreateGame = (payload) => {
    sendJsonMessage({
      type: 'CREATE_GAME',
      payload,
    })
  }

  const onJoinGame = (payload) => {
    sendJsonMessage({
      type: 'JOIN_GAME',
      payload,
    })
  }

  const onRejoinGame = (payload) => {
    sendJsonMessage({
      type: 'REJOIN_GAME',
      payload,
    })
  }

  const localPlayerKey = localStorage.getItem('playerKey')
  return (
    <Router>
      <JoinOrCreateGame path="/" />
      <JoinGame path="/join" onJoinGame={onJoinGame} />
      <CreateGame path="/create" onCreateGame={onCreateGame} />

      {gameState && (
        <GameLobby
          path="/:gameId"
          playerKey={gameState.playerKey}
          game={gameState.game}
          sendMessage={sendJsonMessage}
        />
      )}
      {!gameState && !localPlayerKey && <JoinGame path="/:gameId" onJoinGame={onJoinGame} />}
      {!gameState && localPlayerKey && (
        <RejoinGame path="/:gameId" playerKey={localPlayerKey} onRejoinGame={onRejoinGame} />
      )}
    </Router>
  )
}

Game.propTypes = {}

export default Game
