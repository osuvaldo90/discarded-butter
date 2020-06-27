import { useNavigate } from '@reach/router'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import * as yup from 'yup'

import { makeFormConfig } from '@lib/form'

import SubmitButton from './SubmitButton'
import TextInput from './TextInput'
import Title from './Title'
import SingleColumnLayout from './layout/SingleColumnLayout'

const FORM_CONFIG = makeFormConfig([
  {
    name: 'playerName',
    label: 'Your name',
    size: 'lg',
  },
  {
    name: 'gameId',
    label: '4 letter game code',
    size: 'lg',
  },
])

const VALIDATION_SCHEMA = yup.object({
  playerName: yup.string().min(2).required('Enter your name'),
  gameId: yup
    .string()
    .matches(/^[ABCDEFGHIJKLMNPQRSTUVWXYZ]{4}$/i, 'Enter a 4 letter code')
    .required('Enter a 4 letter code'),
})

const Home = ({ sendMessage }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const playerKey = localStorage.getItem('playerKey')
    const gameId = localStorage.getItem('gameId')

    if (playerKey && gameId) {
      navigate('/' + gameId)
    }
  })

  const onSubmit = ({ playerName, gameId }) =>
    sendMessage({
      type: 'JOIN_GAME',
      payload: { playerName, gameId },
    })

  return (
    <SingleColumnLayout>
      <Title>Welcome!</Title>
      <p>Enter your name and the 4 letter game code to join your friends.</p>
      <Formik
        initialValues={{ gameId: '' }}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {(form) => (
          <Form noValidate onSubmit={form.handleSubmit}>
            <TextInput {...FORM_CONFIG.playerName} form={form} />
            <TextInput {...FORM_CONFIG.gameId} form={form} />
            <div className="text-center">
              <SubmitButton block form={form} />
              <Button className="" block variant="link" onClick={() => navigate('/new-game')}>
                Or, start a new game.
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </SingleColumnLayout>
  )
}

Home.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}

export default Home
