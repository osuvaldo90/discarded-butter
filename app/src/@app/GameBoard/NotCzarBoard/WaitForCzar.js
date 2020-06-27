import PropTypes from 'prop-types'
import React from 'react'

import Title from '@app/Title'
import SingleColumnLayout from '@app/layout/SingleColumnLayout'
import { roundShape } from '@app/state'

import BlackCard from '../BlackCard'
import WhiteCard from '../WhiteCard'

const WaitForCzar = ({ playerKey, round }) => {
  const { status, startTime, timeLimit, submissions, blackCard } = round
  const showTimer = status === 'OPEN'

  return (
    <SingleColumnLayout>
      <Title>Time&apos;s up!</Title>
      <p>Hang on a sec while the card czar makes a decision.</p>

      <BlackCard className="mb-3" showTimer={showTimer} startTime={startTime} timeLimit={timeLimit}>
        {blackCard.content}
      </BlackCard>

      {submissions.map(({ id, content }, index) => {
        return (
          <WhiteCard key={id} className="mb-3" index={index}>
            {content}
          </WhiteCard>
        )
      })}
    </SingleColumnLayout>
  )
}

WaitForCzar.propTypes = {
  playerKey: PropTypes.string.isRequired,
  round: roundShape,
}

export default WaitForCzar
