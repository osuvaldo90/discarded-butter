import { useNavigate } from '@reach/router'
import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'

const JoinOrCreateGame = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Row>
        <Col>
          <h4>Welcome</h4>
          <Button className="w-100 mb-4" onClick={() => navigate('/join')}>
            Join Game
          </Button>
          <Button className="w-100" onClick={() => navigate('/create')}>
            Create Game
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

JoinOrCreateGame.propTypes = {}

export default JoinOrCreateGame
