import PropType from 'prop-types'
import React, { useState } from 'react'
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { FaClipboardList } from 'react-icons/fa'

import PlayerList from './PlayerList'
import WelcomeModal from './WelcomeModal'

const GameLobby = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState()
  const playerNames = ['meghan', 'andrew', 'jules', 'ankur', 'ryan']

  if (playerName) {
    playerNames.push(playerName)
  }
  const players = playerNames.map((name) => ({ name }))

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
                <Button className="w-100" onClick={() => onStartGame({ players })}>
                  Start Game
                </Button>
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
            <PlayerList players={players} opened />
          </Col>
        </Row>
      </Container>
      <WelcomeModal show={!playerName} setPlayerName={setPlayerName} />
    </>
  )
}

GameLobby.propTypes = {
  onStartGame: PropType.func.isRequired,
}

export default GameLobby
