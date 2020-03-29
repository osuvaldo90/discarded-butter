import React from 'react'
import { Container, Row, Col, ProgressBar, Card } from 'react-bootstrap'

import GameCard from './GameCard'
import PlayerList from './PlayerList'

const GameBoard = () => {
  return (
    <Container bg="light">
      <Row className="mt-4">
        <Col>
          <Row className="sticky-top bg-white">
            <Col>
              <GameCard variant="dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget pulvinar
                lacus
                <ProgressBar className="mt-3 mb-1" min={0} max={60} now={47} animated />
              </GameCard>
              {/* <PlayerList className="mt-3 w-100" playerName="oz" /> */}
            </Col>
          </Row>
          <Row xs={1} md={2}>
            <Col className="mt-3">
              <GameCard v>Duis non sapien</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard variant="selected">Quisque sollicitudin</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard>Aliquam</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard>Nam luctus lacus</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard>Donec eu enim eu arcu condimentum sollicitudin</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard>Pellentesque sed nibh elit</GameCard>
            </Col>
            <Col className="mt-3">
              <GameCard>Proin lobortis</GameCard>
            </Col>
            <Col />
          </Row>
        </Col>
        <Col className="d-none d-md-block" md={4}>
          <PlayerList playerName="oz" />
        </Col>
      </Row>
    </Container>
  )
}

export default GameBoard
