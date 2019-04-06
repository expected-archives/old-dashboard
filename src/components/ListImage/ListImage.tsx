import React from "react"
import { Header } from ".."
import { Card, CardBody } from "../Card"
import Container from "../Responsive/Container"
import { Dropdown } from "../Dropdown"

export default () => {
  return (
    <div>
      <Header title="Images" preTitle="Overview"/>

      <Container>
        <Card title="hello">
          <CardBody>
            <p>Hell oworld</p>
            <Dropdown>
              <a href="#">Check here</a>
            </Dropdown>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}
