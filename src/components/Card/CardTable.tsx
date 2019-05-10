import React, {Component, ReactNode} from "react";

interface IColumn {
  title: string
  key: string
  align?: "left" | "center" | "right"
  render?: (data: any) => ReactNode
}

interface IProps<T> {
  onRowClick?: (data: T) => any
  dataSource: T[]
  columns: IColumn[]
}

export default class CardTable<T> extends Component<IProps<T>, {}> {
  onClick = (data: T) => () => {
    if (this.props.onRowClick) {
      this.props.onRowClick(data)
    }
  }

  render = () => (
    <div className="card-table table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            {this.props.columns.map(({title: columnTitle, align}, index) => (
              <th key={index} style={{textAlign: align || "left"}}>
                {columnTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.dataSource.map((data: any, index) => (
            <tr key={index} onClick={this.onClick(data)}>
              {this.props.columns.map(({key, align, render}, index) => (
                <td key={index} style={{textAlign: align || "left"}}>
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
