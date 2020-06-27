import PropTypes from 'prop-types'
import React from 'react'

import Title from '@app/Title'
import SingleColumnLayout from '@app/layout/SingleColumnLayout'
import { blackCardShape } from '@app/state'

import BlackCard from '../BlackCard'

const WaitForSubmissions = ({ startTime, timeLimit, blackCard }) => {
  return (
    <SingleColumnLayout>
      <Title>You&apos;re the card czar</Title>
      <p>Read this card aloud to the other players and wait for them to submit their cards</p>
      <BlackCard className="mt-3" startTime={startTime} timeLimit={timeLimit}>
        {blackCard.content}
      </BlackCard>
    </SingleColumnLayout>
  )
}

WaitForSubmissions.propTypes = {
  startTime: PropTypes.number.isRequired,
  timeLimit: PropTypes.number.isRequired,
  blackCard: PropTypes.shape(blackCardShape).isRequired,
}

export default WaitForSubmissions
