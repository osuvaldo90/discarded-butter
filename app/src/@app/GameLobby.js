import React, { useState } from 'react'
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { FaClipboardList } from 'react-icons/fa'

import PlayerList from './PlayerList'
import WelcomeModal from './WelcomeModal'

const GameLobby = () => {
  const [playerName, setPlayerName] = useState('oz')

  return (
    <>
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
                <Button className="w-100">Start Game</Button>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <InputGroup>
                  <Form.Control readOnly value="https://free-cah.heroku.com/abc123" />
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
            <PlayerList playerName={playerName} />
          </Col>
        </Row>
      </Container>
      <WelcomeModal show={!playerName} setPlayerName={setPlayerName} />
    </>
  )
}

export default GameLobby
