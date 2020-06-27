import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import GameCard from './GameCard'

const WhiteCard = ({ className, children, variant, onSelectCard, index }) => {
  return (
    <GameCard
      className={classNames(className)}
      variant={variant}
      onSelectCard={onSelectCard && (() => onSelectCard(index))}
    >
      {children}
    </GameCard>
  )
}

WhiteCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['selected', 'light']),
  index: PropTypes.number,
  onSelectCard: PropTypes.func,
}

export default WhiteCard
