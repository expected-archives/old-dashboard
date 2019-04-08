import React from "react"
import { Header } from "../Layout"
import { Card, CardBody } from "../Card"
import Container from "../Responsive/Container"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "../Dropdown"

export default () => {
  const overlay = () => (
    <DropdownContent>
      <DropdownItem><a href="#">Action</a></DropdownItem>
      <DropdownItem><a href="#">Another action</a></DropdownItem>
      <DropdownItem><a href="#">Something else here</a></DropdownItem>
    </DropdownContent>
  )
  return (
    <div>
      <Header title="Images" preTitle="Overview"/>

      <Container>
        <Card title="hello">
          <CardBody>
            <p className="text-muted">Hell oworld</p>
            <Dropdown overlay={overlay}>
              <DropdownButton href="#">
                Click me
              </DropdownButton>
            </Dropdown>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}
