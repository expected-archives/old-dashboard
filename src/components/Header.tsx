import React, { ReactNode } from "react"

interface IProps {
  title: string
  preTitle: string
  children?: ReactNode
}

export default ({ title, preTitle, children }: IProps) => (
  <div className="header">
    <div className="row align-items-end">
      <div className="col">
        <h6 className="header-pretitle">{preTitle}</h6>
        <h1 className="header-title">{title}</h1>
      </div>
      {children && (
        <div className="col-auto">
          {children}
        </div>
      )}
    </div>
  </div>
)
