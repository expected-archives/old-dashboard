import React, { ReactNode } from "react"
import styled from "../styled"
import { Container } from "."

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

export default ({ title, preTitle, children }: IProps) => (
  <Header>
    <Container>
      <div className="row align-items-end">
        <div className="col">
          <h6 className="header-pretitle">{preTitle}</h6>
          <h1 className="header-title">{title}</h1>
        </div>
        {children && (
          <div className="col-auto align-self-center">
            {children}
          </div>
        )}
      </div>
    </Container>
  </Header>
)
