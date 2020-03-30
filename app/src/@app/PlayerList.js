import PropTypes from 'prop-types'
import React from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap'

const PlayerList = ({ className, playerName }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        {/* <Accordion.Toggle as={Card.Header}>Players</Accordion.Toggle> */}
        <Card.Header>
          <Accordion.Toggle className="stretched-link" eventKey="0" as={Button} variant="link">
            Players
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <ListGroup>
            <ListGroup.Item>oz</ListGroup.Item>
            <ListGroup.Item>andrew</ListGroup.Item>
            <ListGroup.Item>meghan</ListGroup.Item>
            <ListGroup.Item>ryan</ListGroup.Item>
          </ListGroup>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

PlayerList.propTypes = {
  playerName: PropTypes.string.isRequired,
}

export default PlayerList
