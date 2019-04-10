import React from "react"
import { Header } from "../Layout"
import { Button, Form, FormGroup, FormSection, Input, Select } from "../Form"
import { Col, Container, Row } from "../Responsive"
import { useForm } from "../../hooks"
import AutocompleteInput from "../Form/AutocompleteInput";

const test = () => new Promise((resolve, reject) => setTimeout(resolve, 4000))

export default () => {
  const { loading, error, handleChange, handleSubmit, dispatch, values } = useForm({
    name: "",
    image: "",
    size: "",
    tags: "",
  }, async (values) => {
    await test()
  })

  return (
    <>
      <Header preTitle="Containers" title="Create a new container"/>

      <Container>
        <Form onSubmit={handleSubmit} loading={loading}>
          <FormSection name="Basic"
                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <FormGroup name="Name">
              <Input type="text" placeholder="my-container" name="name"
                     onChange={handleChange} autoComplete="off"/>
            </FormGroup>

            <FormGroup name="Image">
              <Input type="text" placeholder="nginx:latest" name="image"
                     onChange={handleChange} autoComplete="off"/>
            </FormGroup>

            <FormGroup name="Tags"
                       description="This is how others will learn about the project, so make it good!">
              <AutocompleteInput name="tags" suggestions={["hello", "world", "hello world", "hai!"]} onChange={handleChange}/>
            </FormGroup>
          </FormSection>

          <FormSection name="Choose a plan"
                       description=" do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <FormGroup name="Select a size">
              <Select name="size" onChange={handleChange}>
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
