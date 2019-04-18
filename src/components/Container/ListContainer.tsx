import React, { useEffect, useReducer } from "react"
import TimeAgo from "react-timeago"
import client from "../../client"
import { Header } from "../Layout"
import { Container } from "../Responsive"
import { Card, CardTable } from "../Card"
import { Loader } from "../Loader"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "../Dropdown"
import { ButtonLink } from "../Form"
import { styled } from "../../style"

const Tag = styled.div`
  display: inline;
  background: ${props => props.theme.color.dark};
  color: ${props => props.theme.color.light};
  padding: 2px 12px;
  margin-right: 5px;
  border-radius: 15px;
`

const columns = [
  {
    title: "Name",
    render: (data: client.Container) => (
      <>
        {data.name}
      </>
    ),
  },
  {
    title: "Image",
    key: "image",
  },
  {
    title: "Created",
    render: (data: client.Container) => <TimeAgo date={data.createdAt} minPeriod={10}/>,
  },
  {
    title: "Tags",
    render: (data: client.Container) => (
      <>
        {data.tags.map((tag: any, i: number) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </>
    ),
  },
  {
    title: "",
    render: () => {
      const overlay = () => (
        <DropdownContent>
          <DropdownItem><a href="#">Action</a></DropdownItem>
          <DropdownItem><a href="#">Another action</a></DropdownItem>
          <DropdownItem><a href="#">Something else here</a></DropdownItem>
        </DropdownContent>
      )

      return (
        <Dropdown overlay={overlay}>
          <DropdownButton href="#">
            More
          </DropdownButton>
        </Dropdown>
      )
    },
  },
]

type Action =
  { type: "SET_CONTAINERS", containers: client.Container[] } |
  { type: "SET_LOADING", loading: boolean } |
  { type: "SET_ERROR", error: string }

interface IState {
  loading: boolean
  containers: client.Container[]
  error?: string
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      }
    case "SET_CONTAINERS":
      return {
        ...state,
        containers: action.containers,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    containers: [],
  })

  useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true })

    client.getContainers()
      .then((res) => {
        if (res.error) {
          dispatch({ type: "SET_ERROR", error: res.error.message })
        } else if (res.data) {
          dispatch({ type: "SET_CONTAINERS", containers: res.data })
        }
      })
      .catch((error) => dispatch({ type: "SET_ERROR", error: error.message }))
      .finally(() => dispatch({ type: "SET_LOADING", loading: false }))
  }, [])

  return (
    <>
      <Header title="Containers" preTitle="Overview">
        <ButtonLink color="green" to="/containers/new">
          Create
        </ButtonLink>
      </Header>

      <Container>
        {state.error && (
          <p>Error: {state.error}...</p>
        )}
        <Loader loading={state.loading}>
          {state.containers && (
            <Card>
              <CardTable<client.Container> columns={columns} dataSource={state.containers}
                                           onRowClick={(data) => console.log(data)}/>
            </Card>
          )}
        </Loader>
      </Container>
    </>
  )
}
