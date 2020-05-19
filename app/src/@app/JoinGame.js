import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { indexBy, prop, isEmpty } from 'ramda'
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
  {
    name: 'gameId',
    label: 'Enter the 4 letter game ID',
  },
])

const JoinGame = ({ onJoinGame, gameId = '' }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={{ playerName: '', gameId }}
            validationSchema={yup.object({
              playerName: yup.string().min(2).required(),
              gameId: yup
                .string()
                .matches(/^[ABCDEFGHIJKLMNPQRSTUVWXYZ]{4}$/i)
                .required(),
            })}
            onSubmit={onJoinGame}
          >
            {(form) => (
              <Form noValidate onSubmit={form.handleSubmit}>
                <TextInput {...FORM_CONFIG.playerName} form={form} />
                <TextInput {...FORM_CONFIG.gameId} form={form} disabled={!isEmpty(gameId)} />
                <SubmitButton className="w-100" form={form}>
                  {form.isSubmitting ? <Spinner size="sm" animation="border" /> : 'Join Game'}
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

JoinGame.propTypes = {}

export default JoinGame
