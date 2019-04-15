import React from "react"
import { Header } from "../Layout"
import { AutocompleteInput, Button, Form, FormGroup, FormSection, Input, Select, TagInput } from "../Form"
import { Col, Container, Row } from "../Responsive"
import { useForm, usePromise } from "../../hooks"
import { getContainerPlans } from "../../client"
import { styled } from "../../style"

const test = () => new Promise((resolve, reject) => setTimeout(resolve, 4000))

const PlanTable = styled.table`
  width: 100%;
`

const Plan = styled.tr`
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 0.25rem;
  
  td {
    padding: 0.5rem 1rem;
  }
`

export default () => {
  const { data, loading: load } = usePromise(() => Promise.all([
    getContainerPlans(),
  ]), [])

  const { loading, error, handleChange, handleSubmit, dispatch, values } = useForm({
    name: "",
    image: "",
    size: "",
    tags: "",
  }, async (values) => {
    // await test()
  })

  return (
    <>
      <Header preTitle="Containers" title="Create a new container"/>

      <Container>
        <Form onSubmit={handleSubmit} loading={loading && load}>
          <FormSection name="Basic"
                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <FormGroup name="Name">
              <Input type="text" placeholder="my-container" name="name"
                     onChange={handleChange} autoComplete="off"/>
            </FormGroup>

            <FormGroup name="Image">
              <AutocompleteInput placeholder="nginx:latest" name="image"
                                 suggestions={[
                                   "hello", "world",
                                   "hello world", "hai!",
                                   "Super", "Supra!", "Sjikl",
                                 ]}
                                 onChange={(a) => console.log("image:", a.target.value)}/>
            </FormGroup>

            <FormGroup name="Tags"
                       description="This is how others will learn about the project, so make it good!">
              <TagInput placeholder={"type tags here"}
                        suggestions={["hello", "world", "hello world", "hai!"]}
                        onChange={(a) => console.log("tags:", a)}/>
            </FormGroup>
          </FormSection>

          <FormSection name="Choose a plan"
                       description=" do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <PlanTable>
              <tbody>
                {data && data[0].map((plan, index) => (
                  <Plan key={index}>
                    <td>{plan.name}</td>
                    <td>{plan.cpu} vCPU</td>
                    <td>{plan.memory}MB</td>
                    <td>${plan.price}</td>
                  </Plan>
                ))}
              </tbody>
            </PlanTable>
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
