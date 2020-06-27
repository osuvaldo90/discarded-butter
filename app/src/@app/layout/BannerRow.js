import React from 'react'
import { Row, Col } from 'react-bootstrap'

const BannerRow = () => {
  return (
    <Row>
      <Col className="bg-primary text-light text-center py-2">
        <h3 className="m-0">Discarded Butter</h3>
      </Col>
    </Row>
  )
}

export default BannerRow
