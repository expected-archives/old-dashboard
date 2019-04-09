import React, { ReactNode } from "react"
import { styled } from "../../style"
import { Col, Container, Row } from "../Responsive"

interface IProps {
  title: string
  preTitle: string
  children?: ReactNode
}

const Header = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.color.grey};
  margin-bottom: 2rem;
  background: ${props => props.theme.color.light};
`

const PreTitle = styled.h6`
  color: ${props => props.theme.color.greyDark};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 0;
`

export default ({ title, preTitle, children }: IProps) => (
  <Header>
    <Container>
      <Row>
        <Col>
          <PreTitle>{preTitle}</PreTitle>
          <Title>{title}</Title>
        </Col>
        {children && (
          <Col extraSmall="auto" alignSelf="center">
            {children}
          </Col>
        )}
      </Row>
    </Container>
  </Header>
)
