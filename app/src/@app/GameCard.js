import PropTypes from 'prop-types'
import React from 'react'
import { Card, Button } from 'react-bootstrap'

const variantMap = {
  dark: {
    bg: 'dark',
    text: 'white',
    buttonTextClass: 'text-white',
    border: undefined,
  },
  light: {
    bg: undefined,
    text: undefined,
    buttonTextClass: 'text-body',
    border: undefined,
  },
  selected: {
    bg: 'primary',
    text: 'white',
    buttonTextClass: 'text-white',
    border: undefined,
  },
}

const GameCard = ({ className, children, variant = 'light' }) => {
  const { bg, text, buttonTextClass, border } = variantMap[variant]

  return (
    <Card className={className} bg={bg} border={border} text={text}>
      <Card.Body>
        <Button className={`stretched-link text-left ${buttonTextClass}`} variant="link">
          {children}
        </Button>
      </Card.Body>
    </Card>
  )
}

GameCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['light', 'dark', 'selected']),
}

export default GameCard
