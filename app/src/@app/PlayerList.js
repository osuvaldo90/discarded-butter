import PropTypes from 'prop-types'
import React from 'react'
import { ListGroup } from 'react-bootstrap'

const PlayerList = ({ className, playerName }) => {
  return (
    <>
      <h4 className="text-center">Players</h4>
      <ListGroup className={className}>
        {/* <ListGroup.Item variant="primary">Players</ListGroup.Item> */}
        <ListGroup.Item variant="warning">{playerName}</ListGroup.Item>
        <ListGroup.Item variant="warning">andrew</ListGroup.Item>
        <ListGroup.Item variant="warning">meghan</ListGroup.Item>
        <ListGroup.Item variant="success">ryan</ListGroup.Item>
      </ListGroup>
    </>
  )
}

PlayerList.propTypes = {
  playerName: PropTypes.string.isRequired,
}

export default PlayerList
