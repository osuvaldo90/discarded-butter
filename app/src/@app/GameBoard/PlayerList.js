import PropTypes from 'prop-types'
import React from 'react'
import { ListGroup } from 'react-bootstrap'

import { playerShape } from '@app/state'

const PlayerList = ({ players }) => {
  return (
    <ListGroup className="mb-3">
      <ListGroup.Item variant="primary">Players</ListGroup.Item>
      {players.map(({ id, name }) => (
        <ListGroup.Item key={id}> {name}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(playerShape).isRequired,
}

export default PlayerList
