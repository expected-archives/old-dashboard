import React, { ReactNode } from "react"
import { styled } from "../../style"

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


const Table = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

const Header = styled.div`
  
`

export default <T, >({ columns, dataSource = [], onRowClick }: IProps<T>) => {
  const onClick = (data: T) => () => {
    if (onRowClick) {
      onRowClick(data)
    }
  }

  return (
    <div className="card-table table-responsive">
      <table className="table table-hover">
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
          {dataSource.map((data: any, index) => (
            <tr key={index} onClick={onClick(data)}>
              {columns.map(({ key, align, render }, index) => (
                <td key={index} style={{ textAlign: align || "left", verticalAlign: "middle" }}>
                  {render ? render(data[key]) : data[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
