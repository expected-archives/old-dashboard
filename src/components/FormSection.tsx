import React, { ReactNode } from "react"

interface IProps {
  name: string
  description?: string
  children?: ReactNode
}

export default ({ name, description, children }: IProps) => (
  <div className="row form-section">
    <div className="col-md-4">
      <h3>{name}</h3>
      {description && (
        <p className="text-muted">
          {description}
        </p>
      )}
    </div>
    <div className="col-md-8">
      {children}
    </div>
  </div>
)
