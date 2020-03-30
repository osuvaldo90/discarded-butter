import React, { useState } from 'react'

import GameBoard from '@app/GameBoard'
import GameLobby from '@app/GameLobby'

const Game = () => {
  const [players, setPlayers] = useState()

  const onStartGame = ({ players }) => {
    setPlayers(players)
  }

  if (players) {
    return <GameBoard players={players} />
  } else {
    return <GameLobby onStartGame={onStartGame} />
  }
}

Game.propTypes = {}

export default Game
