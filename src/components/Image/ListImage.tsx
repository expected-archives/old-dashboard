import React from "react"
import { ButtonLink } from "../Form";
import { Header } from "../Layout";

export default () => {
  return (
    <>
      <Header title="Images" preTitle="Overview">
        <ButtonLink color="green" to="/images/how-to-push">
          Create
        </ButtonLink>
      </Header>
    </>
  )
}
