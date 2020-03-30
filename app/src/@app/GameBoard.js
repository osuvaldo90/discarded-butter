import PropTypes from 'prop-types'
import React from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'

import GameCard from './GameCard'
import PlayerList from './PlayerList'

const GameBoard = ({ players }) => {
  return (
    <Container bg="light">
      <Row className="mt-4 h-100">
        <Col>
          <Row className="sticky-top bg-white border-bottom">
            <Col>
              <GameCard variant="dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget pulvinar
                lacus
                <ProgressBar className="mt-3" min={0} max={60} now={47} animated />
              </GameCard>
              {/* <PlayerList className="mt-3 w-100" playerName="oz" /> */}
            </Col>
          </Row>
          <Row className="d-md-none">
            <Col className="mt-3">
              <PlayerList players={players} opened={false} />
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
          <PlayerList players={players} opened={true} />
        </Col>
      </Row>
    </Container>
  )
}

GameBoard.propTypes = {
  players: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default GameBoard
