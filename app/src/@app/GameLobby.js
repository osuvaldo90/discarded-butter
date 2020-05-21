import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { FaClipboardList } from 'react-icons/fa'

import PlayerList from './PlayerList'

const GameLobby = ({ gameState, sendMessage }) => {
  const onStartGame = () => {
    sendMessage({
      type: 'START_GAME',
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
                <Form.Control readOnly value={`https://free-cah.heroku.com/${gameState.game.id}`} />
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
          <PlayerList players={gameState.game.players} opened />
        </Col>
      </Row>
    </Container>
  )
}

GameLobby.propTypes = {}

export default GameLobby
