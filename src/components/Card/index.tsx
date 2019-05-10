import "./index.scss"
import React, {Component, ReactNode} from "react"
import CardBody from "./CardBody"
import CardTable from "./CardTable"

interface IProps {
  title?: string
  children: ReactNode
}

export default class Card extends Component<IProps, {}> {
  static Body: typeof CardBody = CardBody;
  static Table: typeof CardTable = CardTable;

  render = () => (
    <div className="card">
      {this.props.title && (
        <div className="card-header">
          <h4>{this.props.title}</h4>
        </div>
      )}
      {this.props.children}
    </div>
  )
}
