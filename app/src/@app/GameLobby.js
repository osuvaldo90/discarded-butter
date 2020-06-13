import PropTypes from 'prop-types'
import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { FaClipboardList } from 'react-icons/fa'

import PlayerList from './PlayerList'
import { gameStateShape } from './state'

const GameLobby = ({ gameState, sendMessage }) => {
  const onStartGame = () => {
    sendMessage({
      type: 'START_ROUND',
      payload: { playerKey: gameState.playerKey },
    })
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-center">
          <h2>Discarded Butter</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Row>
            <Col className="text-center">
              <Button className="w-100" onClick={onStartGame}>
                Start Game
              </Button>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <InputGroup>
                <Form.Control readOnly value={`https://free-cah.heroku.com/${gameState.gameId}`} />
                <InputGroup.Append>
                  <Button title="Copy link">
                    <FaClipboardList />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <div className="text-center">Share this link to play with friends</div>
            </Col>
          </Row>
        </Col>
        <Col>
          <PlayerList players={gameState.players} opened />
        </Col>
      </Row>
    </Container>
  )
}

GameLobby.propTypes = {
  gameState: gameStateShape.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

export default GameLobby
