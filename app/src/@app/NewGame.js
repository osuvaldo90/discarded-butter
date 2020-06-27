import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { indexBy, prop } from 'ramda'
import React from 'react'
import * as yup from 'yup'

import SubmitButton from './SubmitButton'
import TextInput from './TextInput'
import SingleColumnLayout from './layout/SingleColumnLayout'

const FORM_CONFIG = indexBy(prop('name'), [
  {
    name: 'playerName',
    label: `Enter your name and you'll get a link to play with your friends.`,
    size: 'lg',
  },
])

const VALIDATION_SCHEMA = yup.object({
  playerName: yup.string().min(2).required(),
})

const NewGame = ({ sendMessage }) => {
  const onSubmit = ({ playerName }) =>
    sendMessage({
      type: 'CREATE_GAME',
      payload: {
        playerName,
      },
    })

  return (
    <SingleColumnLayout>
      <Formik
        initialValues={{ playerName: '' }}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {(form) => (
          <Form noValidate onSubmit={form.handleSubmit}>
            <TextInput {...FORM_CONFIG.playerName} form={form} />
            <SubmitButton block form={form} />
          </Form>
        )}
      </Formik>
    </SingleColumnLayout>
  )
}

NewGame.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}

export default NewGame
