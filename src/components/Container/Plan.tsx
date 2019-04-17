import React from "react"
import { styled } from "../../style"

interface IProps {
  name: string
  cpu: number
  memory: number
}

export const PlanTable = styled.table`
  width: 100%;
`

export const Plan = styled.tr`
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 0.25rem;

  td {
    padding: 0.5rem 1rem;
  }
`

// export const Plan = ({ name, cpu, memory }: IProps) => {
//   return (
//     <DetailedPlan>
//       <h3>{name}</h3>
//
//       <ul>
//         <li>{cpu} virtual cpu</li>
//         <li>{memory}MB</li>
//         <li>Unlimited bandwidth</li>
//       </ul>
//     </DetailedPlan>
//   )
// }
