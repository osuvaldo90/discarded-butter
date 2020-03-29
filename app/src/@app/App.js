import React from 'react'
import { Container, Row, Col, Button, InputGroup, Form, ListGroup } from 'react-bootstrap'
import { FaClipboardList } from 'react-icons/fa'

const App = () => {
  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-center">
          <h2>Discarded Butter</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={true}>
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
          <ListGroup>
            <ListGroup.Item variant="primary">Players</ListGroup.Item>
            <ListGroup.Item>Player 1</ListGroup.Item>
            <ListGroup.Item>Player 2</ListGroup.Item>
            <ListGroup.Item>Player 3</ListGroup.Item>
            <ListGroup.Item>Player 4</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default App
