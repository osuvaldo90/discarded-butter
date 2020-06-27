import PropTypes from 'prop-types'
import { ifElse, isNil } from 'ramda'
import React from 'react'

import { isNilOrEmpty } from '@lib/util'

import GameCard from '../GameCard'
import WinnerChosen from '../WinnerChosen'

import PickACard from './PickACard'
import WaitForCzar from './WaitForCzar'

const WhiteCard = ({ children, variant, onSelectCard, index }) => {
  return (
    <GameCard
      className="h-100"
      variant={variant}
      onSelectCard={onSelectCard && (() => onSelectCard(index))}
    >
      {children}
    </GameCard>
  )
}

WhiteCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['selected', 'light']),
  index: PropTypes.number,
  onSelectCard: PropTypes.func,
}

const NotCzarBoard = ({ sendMessage, playerKey, round }) => {
  const { submissions, winner } = round

  return ifElse(
    () => isNilOrEmpty(submissions),
    () => <PickACard sendMessage={sendMessage} playerKey={playerKey} round={round} />,
    ifElse(
      () => isNil(winner),
      () => <WaitForCzar playerKey={playerKey} round={round} />,
      () => <WinnerChosen sendMessage={sendMessage} playerKey={playerKey} round={round} />,
    ),
  )()
}

NotCzarBoard.propTypes = {
  sendMessage: PropTypes.func,
}

export default NotCzarBoard
