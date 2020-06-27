import PropTypes from 'prop-types'
import React, { useState } from 'react'

import Title from '@app/Title'
import SingleColumnLayout from '@app/layout/SingleColumnLayout'
import { roundShape } from '@app/state'

import BlackCard from '../BlackCard'
import WhiteCard from '../WhiteCard'

const PickACard = ({ sendMessage, playerKey, round }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState()

  const { hand, blackCard } = round

  const onSelectCard = (index) => {
    setSelectedCardIndex(index)
    const selectedCard = hand[index]
    sendMessage({
      type: 'SUBMIT_WHITE_CARD',
      payload: {
        playerKey: playerKey,
        roundId: round.id,
        cardId: selectedCard.id,
      },
    })
  }

  const { status, startTime, timeLimit, submissions } = round
  const showTimer = status === 'OPEN'

  return (
    <SingleColumnLayout>
      <Title>Pick a card</Title>
      <p>Choose a white card from your hand to fill in the blank of the black card.</p>

      <BlackCard
        className="mb-3 sticky-top"
        showTimer={showTimer}
        startTime={startTime}
        timeLimit={timeLimit}
      >
        {blackCard.content}
      </BlackCard>

      {!submissions &&
        hand &&
        hand.map(({ id, content }, index) => {
          const variant = index === selectedCardIndex ? 'selected' : 'light'

          return (
            <WhiteCard
              className="mb-3"
              key={id}
              index={index}
              onSelectCard={onSelectCard}
              variant={variant}
            >
              {content}
            </WhiteCard>
          )
        })}
    </SingleColumnLayout>
  )
}

PickACard.propTypes = {
  sendMessage: PropTypes.func,
  playerKey: PropTypes.string.isRequired,
  round: roundShape.isRequired,
}

export default PickACard
