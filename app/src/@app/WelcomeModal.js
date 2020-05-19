import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
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

export default WelcomeModal
