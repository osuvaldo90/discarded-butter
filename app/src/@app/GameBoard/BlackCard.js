import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'

import GameCard from './GameCard'

const WARNING_THRESHOLD_SECONDS = 5
const DANGER_THRESHOLD_SECONDS = 3

const BlackCard = ({ className, children, startTime, timeLimit }) => {
  const [msLeft, setMsLeft] = useState(timeLimit)

  const secondsLeft = Math.floor(msLeft / 1000)

  useEffect(() => {
    if (msLeft > 0) {
      setTimeout(() => {
        const elapsed = Date.now() - startTime
        setMsLeft(Math.max(0, timeLimit - elapsed))
      }, 100)
    }
  }, [startTime, timeLimit, msLeft])

  const progressBarVariant =
    secondsLeft > WARNING_THRESHOLD_SECONDS
      ? 'primary'
      : secondsLeft > DANGER_THRESHOLD_SECONDS
      ? 'warning'
      : 'danger'

  return (
    <GameCard className={`${className}`} variant="dark">
      {children}
      {secondsLeft > 0 ? (
        <ProgressBar
          className="mt-3"
          variant={progressBarVariant}
          min={0}
          max={timeLimit / 1000}
          now={secondsLeft}
          label={`${secondsLeft}s`}
          animated
        />
      ) : (
        <div className="mt-2 text-white-50">Time&apos;s up!</div>
      )}
    </GameCard>
  )
}

BlackCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  startTime: PropTypes.number.isRequired,
  timeLimit: PropTypes.number.isRequired,
}

export default BlackCard
