import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Container, Row, Col, Button, InputGroup, Form, ListGroup, Modal } from 'react-bootstrap'
import { FaClipboardList } from 'react-icons/fa'
import * as yup from 'yup'

const WelcomeModal = ({ show, setPlayerName }) => {
  const initialValues = { playerName: '' }
  const validationSchema = yup.object({
    playerName: yup.string().min(2).required(),
  })

  const onSubmit = (values, form) => {
    setPlayerName(values.playerName)
    form.setSubmitting(false)
  }

  return (
    <Modal show={show} onHide={() => {}}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(form) => {
          const playerNameError = form.touched.playerName && form.errors.playerName
          return (
            <Form noValidate onSubmit={form.handleSubmit}>
              <Modal.Header>
                <Modal.Title>Welcome</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Enter your name to join the game</Form.Label>
                  <Form.Control
                    name="playerName"
                    isInvalid={!!playerNameError}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.playerName}
                    disabled={form.isSubmitting}
                  />
                </Form.Group>
                <Button type="submit" disabled={form.isSubmitting}>
                  Join
                </Button>
              </Modal.Body>
              {/* <Modal.Footer>
              </Modal.Footer> */}
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

WelcomeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setPlayerName: PropTypes.func.isRequired,
}

const App = () => {
  const [playerName, setPlayerName] = useState()

  return (
    <>
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
      <WelcomeModal show={!playerName} setPlayerName={setPlayerName} />
    </>
  )
}

export default App
