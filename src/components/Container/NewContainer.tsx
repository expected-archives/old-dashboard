import React from "react"
import { Header } from "../Layout"
import { Button, Form, FormGroup, FormSection, Input, Select } from "../Form"
import { Col, Container, Row } from "../Responsive"

// col-12 col-lg-10 col-xl-8

export default () => {
  // const { loading, error, handleChange, handleSubmit } = useForm({
  //   name: "",
  //   image: "",
  //   size: "64",
  //   tags: "",
  // }, async (values) => {
  //   throw new Error("lol")
  // })

  const [handleChange, handleSubmit] = [undefined, undefined]

  return (
    <>
      <Header preTitle="Containers" title="Create a new container"/>

      <Container>
        <Form onSubmit={handleSubmit}>
          <FormSection name="Basic"
                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <FormGroup name="Name">
              <Input
                type="text"
                className="form-control"
                placeholder="my-container"
                name="name"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup name={"Image"}>
              <Input
                type="text"
                className="form-control"
                placeholder="nginx:latest"
                name="image"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup
              name="Tags"
              description="This is how others will learn about the project, so make it good!">
              <Input
                type="text"
                className="form-control"
                name="tags"
                onChange={handleChange}
              />
            </FormGroup>
          </FormSection>

          <FormSection name="Choose a plan"
                       description=" do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <FormGroup name="Select a size">
              <Select
                className="form-control"
                name="size"
                onChange={handleChange}>
                <option value="64">64mb</option>
                <option value="128">128mb</option>
                <option value="256">256mb</option>
              </Select>
            </FormGroup>
          </FormSection>

          <Row justifyContent="flex-end">
            <Col medium={12} large={10} extraLarge={8}>
              <Button color="green" block>
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}
