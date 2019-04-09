/** @jsx jsx */
import React, { ReactNode } from "react"
import { styled } from "../../style"
import { css, jsx } from "@emotion/core"

interface IColumn {
  title: string
  key: string
  align?: "left" | "center" | "right"
  render?: (data: any) => ReactNode
}

interface IProps<T> {
  onRowClick?: (data: T) => any
  dataSource: T[] | undefined
  columns: IColumn[]
}

const Table = styled.table`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
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
            <th key={index} css={css`text-align: ${align || "left"}`}>
              {columnTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data: any, index) => (
          <tr key={index} onClick={onClick(data)}>
            {columns.map(({ key, align, render }, index) => (
              <td key={index} css={css`
                text-align: ${align || "left"};
                vertical-align: middle;
              `}>
                {render ? render(data[key]) : data[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
