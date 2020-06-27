import { useParams } from '@reach/router'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import * as yup from 'yup'

import SubmitButton from '@app/SubmitButton'
import TextInput from '@app/TextInput'
import SingleColumnLayout from '@app/layout/SingleColumnLayout'

import { makeFormConfig } from '@lib/form'

const FORM_CONFIG = makeFormConfig([
  {
    name: 'playerName',
    label: 'Enter your name to join your friends.',
    size: 'lg',
  },
])

const VALIDATION_SCHEMA = yup.object({
  playerName: yup.string().min(2).required('Enter your name'),
})

const JoinGame = ({ sendMessage }) => {
  const { gameId } = useParams()

  const onSubmit = ({ playerName }) =>
    sendMessage({
      type: 'JOIN_GAME',
      payload: { gameId, playerName },
    })

  return (
    <SingleColumnLayout>
      <h5>Welcome!</h5>
      <Formik
        initialValues={{ gameId: '' }}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {(form) => (
          <Form noValidate onSubmit={form.handleSubmit}>
            <TextInput {...FORM_CONFIG.playerName} form={form} />
            <div className="text-center">
              <SubmitButton block form={form} />
              <Button className="" block variant="link" onClick={() => {}}>
                Or, start a new game.
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </SingleColumnLayout>
  )
}

JoinGame.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
}

export default JoinGame
