import React, { FormEvent, useEffect, useReducer } from "react"
import { Header } from "../Layout"
import { AutocompleteInput, Button, Form, FormGroup, FormSection, Input, TagInput } from "../Form"
import { Col, Container, Row } from "../Responsive"
import { Plan, PlanTable } from "./Plan"
import { createContainer, CreateContainerRequest, getContainerPlans, IContainerPlan } from "../../client"

type Action =
  { type: "SET_LOADING", loading: boolean } |
  { type: "SET_FORM_VALUE", key: string, value: any } |
  { type: "SET_PLANS", plans: IContainerPlan[] }

interface IState {
  loading: boolean
  form: CreateContainerRequest,
  plans: IContainerPlan[]
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      }
    case "SET_FORM_VALUE":
      return {
        ...state,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      }
    case "SET_PLANS":
      return {
        ...state,
        plans: action.plans,
      }
    default:
      return state
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    form: {
      name: "",
      image: "",
      size: "64",
      tags: [],
    },
    plans: [],
  })

  useEffect(() => {
    getContainerPlans()
      .then(plans => dispatch({ type: "SET_PLANS", plans }))
      .finally(() => dispatch({ type: "SET_LOADING", loading: false }))
    // .catch(error => )
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    dispatch({ type: "SET_LOADING", loading: true })
    createContainer(state.form)
      .then(console.log)
      .catch(console.error)
      .finally(() => dispatch({ type: "SET_LOADING", loading: false }))
  }

  return (
    <>
      <Header preTitle="Containers" title="Create a new container"/>

      <Container>
        <Form onSubmit={handleSubmit} loading={state.loading}>
          <FormSection name="Basic"
                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <FormGroup name="Name">
              <Input type="text" placeholder="my-container" name="name"
                     onChange={(event) => dispatch({ type: "SET_FORM_VALUE", key: "name", value: event.target.value })}
                     autoComplete="off"/>
            </FormGroup>

            <FormGroup name="Image">
              <AutocompleteInput placeholder="nginx:latest" name="image"
                                 suggestions={[
                                   "hello", "world",
                                   "hello world", "hai!",
                                   "Super", "Supra!", "Sjikl",
                                 ]}
                                 onChange={(event) => dispatch({
                                   type: "SET_FORM_VALUE",
                                   key: "image",
                                   value: event.target.value,
                                 })}/>
            </FormGroup>

            <FormGroup name="Tags"
                       description="This is how others will learn about the project, so make it good!">
              <TagInput placeholder={"type tags here"} suggestions={["hello", "world", "hello world", "hai!"]}
                        onChange={(tags) => dispatch({ type: "SET_FORM_VALUE", key: "tags", value: tags })}/>
            </FormGroup>
          </FormSection>

          <FormSection name="Choose a plan"
                       description=" do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <PlanTable>
              <tbody>
                {state.plans && state.plans.map((plan, index) => (
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
              <Button color="green" block type="submit">
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}
