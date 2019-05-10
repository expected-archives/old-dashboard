import "./index.scss";
import React, {Component, ReactNode} from "react";

interface IProps {
  title: string
  preTitle?: string
  children?: ReactNode
}

export default class Header extends Component<IProps, {}> {
  render = () => (
    <div className="header">
      <div className="container">
        <div className="row align-items-end">
          <div className="col">
            {this.props.preTitle && (
              <h6 className="header-pretitle">
                {this.props.preTitle}
              </h6>
            )}
            <h1 className="header-title">{this.props.title}</h1>
          </div>
          {this.props.children && (
            <div className="col-auto align-self-center">
              {this.props.children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
