import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import BannerRow from './BannerRow'

const SingleColumnLayout = ({ className, children }) => {
  return (
    <Container className={classNames(className)} fluid>
      <BannerRow />
      <Row className="mt-3">
        <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

SingleColumnLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default SingleColumnLayout
