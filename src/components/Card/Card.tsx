import React, { ReactNode } from "react"
import { styled } from "../../style"

interface IProps {
  title?: string
  children: ReactNode
}

const Card = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-color: #edf2f9;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
  background-color: ${props => props.theme.color.light};
  border-radius: .25rem;
`

const Header = styled.div`
  margin-bottom: 0;
  padding: 1rem 1.5rem;
  color: inherit;
  border-bottom: 1px solid ${props => props.theme.color.grey};
  background-color: transparent;
  
  h4 {
    margin: 0;
  }
`

export default ({ title, children }: IProps) => (
  <Card>
    {title && (
      <Header>
        <h4>{title}</h4>
      </Header>
    )}
    {children}
  </Card>
)
