import React from "react"
import { Link } from "react-router-dom"
import { Form, FormGroup, Header } from ".."
import { useForm } from "../../hooks"

export default () => {
  const { loading, error, handleChange, handleSubmit } = useForm({
    name: "",
    image: "",
    size: "64",
    tags: "",
  }, async (values) => {
    throw new Error("lol")
  })

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <Header pretitle="Containers" title="Create a new container"/>

        <p>Loading: {loading}, Error: {error && error.message}</p>

        <Form onSubmit={handleSubmit}>
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

          <hr className="mt-5 mb-5"/>

          <button className="btn btn-block btn-success">
            Create container
          </button>
          <Link to="/containers" className="btn btn-block btn-link text-muted">
            Cancel
          </Link>
        </Form>
      </div>
    </div>
  )
}
