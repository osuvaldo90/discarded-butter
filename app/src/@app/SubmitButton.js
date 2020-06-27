import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'

const SubmitButton = ({ className = '', form, block = false, children }) => {
  return (
    <Button
      className={classNames(className)}
      type="submit"
      disabled={form.isSubmitting}
      block={block}
    >
      <span className={classNames('block', { invisible: false })}>{children || 'Submit'}</span>
      {/* {form.isSubmitting && <Spinner size="sm" animation="border" />} */}
    </Button>
  )
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  form: PropTypes.object.isRequired,
  block: PropTypes.bool,
  children: PropTypes.node,
}

export default SubmitButton
