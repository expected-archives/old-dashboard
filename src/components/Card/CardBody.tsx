import React, {Component, ReactNode} from "react";

interface IProps {
  children: ReactNode
}

export default class CardBody extends Component<IProps, {}> {
  render = () => (
    <div className="card-body">
      {this.props.children}
    </div>
  )
}
