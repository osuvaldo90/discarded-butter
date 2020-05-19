import { useParams } from '@reach/router'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const RejoinGame = ({ playerKey, onRejoinGame }) => {
  const { gameId } = useParams()

  useEffect(() => {
    if (playerKey) {
      onRejoinGame({ playerKey, gameId })
    }
  })
  return <div>durrr</div>
}

RejoinGame.propTypes = {}

export default RejoinGame
