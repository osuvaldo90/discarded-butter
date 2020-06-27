import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-bootstrap'

const TextInput = ({ className = '', name, label, disabled, size, form }) => {
  const inputValue = form.values[name]
  const touched = form.touched[name]
  const error = form.errors[name]

  const isInvalid = touched && error

  return (
    <Form.Group className={classNames(className)}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        name={name}
        isInvalid={isInvalid}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={inputValue}
        size={size}
        disabled={form.isSubmitting || disabled}
      />
      {/* {!isInvalid && (
        <div className="invisible">
          <small>Error placeholder</small>
        </div>
      )} */}
      {/* <Form.Control.Feedback className="" type="invalid">
        {error || 'ERROR PLACEHOLDER'}
      </Form.Control.Feedback> */}
    </Form.Group>
  )
}

TextInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.object,
  size: PropTypes.oneOf(['sm', 'lg']),
}

export default TextInput
