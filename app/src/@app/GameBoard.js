import React from 'react'
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Card,
  Accordion,
  ListGroup,
  Button,
} from 'react-bootstrap'

import GameCard from './GameCard'
import PlayerList from './PlayerList'

const GameBoard = () => {
  return (
    <Container bg="light">
      <Row className="mt-4 h-100">
        <Col>
          <Row className="sticky-top bg-white border-bottom">
            <Col>
              <GameCard className="my-2" variant="dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget pulvinar
                lacus
                <ProgressBar className="mt-3" min={0} max={60} now={47} animated />
              </GameCard>
              {/* <PlayerList className="mt-3 w-100" playerName="oz" /> */}
            </Col>
          </Row>
          <Row className="d-md-none">
            <Col className="mt-3">
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle
                      className="stretched-link"
                      eventKey="0"
                      as={Button}
                      variant="link"
                    >
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
            </Col>
          </Row>
          <Row xs={1} md={2}>
            <Col className="mt-3">
              <GameCard className="h-100">Duis non sapien</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard variant="selected">Quisque sollicitudin</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard className="h-100">Aliquam</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard className="h-100">Donec eu enim eu arcu condimentum sollicitudin</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard className="h-100">Nam luctus lacus</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard className="h-100">Pellentesque sed nibh elit</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard className="h-100">Proin lobortis</GameCard>
            </Col>
            <Col />
          </Row>
        </Col>
        <Col className="d-none d-md-block" md={3}>
          <PlayerList playerName="oz" />
        </Col>
      </Row>
    </Container>
  )
}

export default GameBoard
