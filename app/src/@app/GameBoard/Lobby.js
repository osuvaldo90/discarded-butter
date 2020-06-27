import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'

import SingleColumnLayout from '@app/layout/SingleColumnLayout'
import { playerShape } from '@app/state'

import PlayerList from './PlayerList'

const Lobby = ({ sendMessage, gameId, players, playerKey }) => {
  const onStartGame = () => {
    sendMessage({
      type: 'START_ROUND',
      payload: { playerKey: playerKey },
    })
  }

  return (
    <SingleColumnLayout>
      <p>
        Your game code is <span className="font-weight-bolder text-info">{gameId}</span>. Share it
        with your friends so they can join the game.
      </p>
      <p>When everyone&apos;s in, click the button below to start the first round.</p>

      <PlayerList players={players} />

      <Button block onClick={onStartGame}>
        Start Game
      </Button>
      {/* <Button block variant="outline-primary">
        Copy link
      </Button> */}
    </SingleColumnLayout>
  )
}

Lobby.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerShape).isRequired,
  playerKey: PropTypes.string.isRequired,
}

export default Lobby
