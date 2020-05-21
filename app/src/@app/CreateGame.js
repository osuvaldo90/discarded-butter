import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { indexBy, prop } from 'ramda'
import React from 'react'
import { Form, Container, Row, Col, Spinner } from 'react-bootstrap'
import * as yup from 'yup'

import SubmitButton from './SubmitButton'
import TextInput from './TextInput'

const FORM_CONFIG = indexBy(prop('name'), [
  {
    name: 'playerName',
    label: 'Enter your name',
  },
])

const CreateGame = ({ sendMessage }) => {
  const onCreateGame = (payload) =>
    sendMessage({
      type: 'CREATE_GAME',
      payload,
    })

  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={{ playerName: '' }}
            validationSchema={yup.object({ playerName: yup.string().min(2).required() })}
            onSubmit={onCreateGame}
          >
            {(form) => (
              <Form noValidate onSubmit={form.handleSubmit}>
                <TextInput {...FORM_CONFIG.playerName} form={form} />
                <SubmitButton className="w-100" form={form}>
                  {form.isSubmitting ? <Spinner size="sm" animation="border" /> : 'Create Game'}
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

CreateGame.propTypes = {}

export default CreateGame
