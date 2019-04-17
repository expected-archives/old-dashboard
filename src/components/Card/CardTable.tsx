import React, { ReactNode } from "react"
import { styled } from "../../style"

type IColumn<T> =
  {
    title: string
    align?: "left" | "center" | "right"
    key?: string
    render?: (data: T) => ReactNode
  }

interface IProps<T> {
  onRowClick?: (data: T) => any
  dataSource: T[] | undefined
  columns: IColumn<T>[]
}

const Table = styled.table`
  width: 100%;
  
  th {
    color: ${props => props.theme.color.dark};
    font-weight: 600;
    border-bottom: 1px solid ${props => props.theme.color.grey};
    font-size: 0.9375rem;
    background: transparent;
    padding: 0.8rem;
  }
  
  tbody > tr:hover {
    transition: all 0.3s, height 0s;
    background: ${props => props.theme.color.greyLight};
  }
  
  td {
    padding: 1rem 0.8rem;
    border-top: 1px solid ${props => props.theme.color.grey};
  }
  
`

export default <T, >({ columns, dataSource = [], onRowClick }: IProps<T>) => {
  const onClick = (data: T) => () => {
    if (onRowClick) {
      onRowClick(data)
    }
  }

  return (
    <Table>
      <thead>
        <tr>
          {columns.map(({ title: columnTitle, align }, index) => (
            <th key={index} style={{ textAlign: align || "left" }}>
              {columnTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, index) => (
          <tr key={index} onClick={onClick(data)}>
            {columns.map((column, index) => (
              <td key={index} style={{
                textAlign: column.align || "left",
                verticalAlign: "middle",
              }}>
                {column.render ? column.render(data) : (data as any)[column.key as any]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
