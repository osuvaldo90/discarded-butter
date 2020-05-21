import PropTypes from 'prop-types'
import React from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap'

const PlayerList = ({ className, players, opened }) => {
  const defaultActiveKey = opened ? '0' : undefined
  return (
    <Accordion className={className} defaultActiveKey={defaultActiveKey}>
      <Card>
        <Card.Header>
          <Accordion.Toggle className="stretched-link" eventKey="0" as={Button} variant="link">
            Players
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <ListGroup>
            {players.map(({ id, name }) => (
              <ListGroup.Item key={id}>{name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

PlayerList.propTypes = {
  className: PropTypes.string,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  opened: PropTypes.bool,
}

export default PlayerList
