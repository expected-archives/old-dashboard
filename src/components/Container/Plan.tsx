import React from "react"
import { Col } from "../Responsive"
import { styled } from "../../style"

interface IProps {
  name: string
  cpu: number
  memory: number
}

const Plan = styled.div`
  background: ${props => props.theme.color.light};
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 5px;
  padding: 1rem;
  width: 250px;
  
  h3 {
    text-align: center;
    margin-bottom: 1.2rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      border-top: 1px solid ${props => props.theme.color.grey};
      padding: 0.4rem 0.8rem;
    }
  }
`

export default ({ name, cpu, memory }: IProps) => {
  return (
    <>
      <Plan>
        <h3>{name}</h3>

        <ul>
          <li>{cpu} virtual cpu</li>
          <li>{memory}MB</li>
          <li>Unlimited bandwidth</li>
        </ul>
      </Plan>
    </>
  )
}
