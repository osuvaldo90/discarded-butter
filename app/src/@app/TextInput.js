import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-bootstrap'

const TextInput = ({ className = '', name, label, disabled, form }) => {
  const inputValue = form.values[name]
  const inputError = form.touched[name] && form.errors[name]

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        name={name}
        isInvalid={!!inputError}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={inputValue}
        disabled={form.isSubmitting || disabled}
      />
    </Form.Group>
  )
}

TextInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.object,
}

export default TextInput
