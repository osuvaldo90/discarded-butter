import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const Title = ({ className, children }) => {
  return <h5 className={classNames(className)}>{children}</h5>
}

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Title
