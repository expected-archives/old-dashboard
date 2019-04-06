import React from "react"
import { Header } from ".."
import { Nav, NavLink } from "../Nav"
import { Card, CardBody } from "../Card"
import Container from "../Container"

export default () => {
  return (
    <div>
      <Header title="Images" preTitle="Overview"/>

      <Container>
        <Card title="hello">
          <CardBody>
            <p>Hell oworld</p>
            <Nav>
              <NavLink to="/containers" name="Containers"/>
              <NavLink to="/images" name="Images"/>
            </Nav>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}
