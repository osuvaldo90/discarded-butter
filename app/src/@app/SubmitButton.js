import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'

const SubmitButton = ({ className = '', form, children }) => {
  return (
    <Button className={`${className}`} type="submit" disabled={form.isSubmitting}>
      {children}
    </Button>
  )
}

SubmitButton.propTypes = {}

export default SubmitButton
