import React, { ReactNode } from "react"
import { Col, Row } from "../Responsive"

interface IProps {
  name: string
  description?: string
  children?: ReactNode
}

export default ({ name, description, children }: IProps) => (
  <Row className="form-section">
    <Col  medium={4}>
      <h3>{name}</h3>
      {description && (
        <p className="text-muted">
          {description}
        </p>
      )}
    </Col>
    <Col medium={8}>
      {children}
    </Col>
  </Row>
)
