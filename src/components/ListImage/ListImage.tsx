import React from "react"
import { Header } from ".."
import { Card, CardBody } from "../Card"
import Container from "../Responsive/Container"

export default () => {
  return (
    <div>
      <Header title="Images" preTitle="Overview"/>

      <Container>
        <Card title="hello">
          <CardBody>
            <p>Hell oworld</p>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}
