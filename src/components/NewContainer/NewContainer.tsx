import React from "react"
import { Link } from "react-router-dom"
import { Form, FormGroup, FormSection, Header } from ".."
import { useForm } from "../../hooks"

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

      <Form onSubmit={handleSubmit}>
        <FormSection name="Basic" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
          <FormGroup name="Name">
            <input
              type="text"
              className="form-control"
              placeholder="my-container"
              name="name"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup name={"Image"}>
            <input
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
            <input
              type="text"
              className="form-control"
              name="tags"
              onChange={handleChange}
            />
          </FormGroup>
        </FormSection>

        <FormSection name="Choose a plan" description=" do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
          <FormGroup name="Select a size">
            <select
              className="form-control"
              name="size"
              onChange={handleChange}>
              <option value="64">64mb</option>
              <option value="128">128mb</option>
              <option value="256">256mb</option>
            </select>
          </FormGroup>
        </FormSection>

        <div className="row justify-content-end">
          <div className="col-12 col-lg-10 col-xl-8">
            <button className="btn btn-success p-2 btn-block">
              Create
            </button>
          </div>


        </div>
      </Form>


    </>
  )
}
