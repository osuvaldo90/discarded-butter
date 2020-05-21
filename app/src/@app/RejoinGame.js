import { useParams } from '@reach/router'
import React, { useEffect, useRef } from 'react'

const RejoinGame = ({ playerKey, sendMessage }) => {
  const rejoinedRef = useRef(false)
  const { gameId } = useParams()

  useEffect(() => {
    if (playerKey && !rejoinedRef.current) {
      rejoinedRef.current = true
      sendMessage({
        type: 'REJOIN_GAME',
        payload: { playerKey, gameId },
      })
    }
  })
  return <div>durrr</div>
}

RejoinGame.propTypes = {}

export default RejoinGame
