import React, { useEffect, useReducer } from "react"
import TimeAgo from "react-timeago"
import { Header } from "../Layout"
import { Loader } from "../Loader"
import { Card, CardBody, CardTable } from "../Card"
import { Container } from "../Responsive"
import { styled } from "../../style"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "../Dropdown"
import { useMappedState } from "redux-react-hook"
import client from "../../client"

const NoImage = styled(CardBody)`
  h3 {
    margin-bottom: 2rem;
  }
  
  pre {
    width: fit-content;
    color: ${props => props.theme.color.light};
    background: ${props => props.theme.color.dark};
    padding: 0.5rem 1.25rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    
    div {
      padding: 0.5rem 0;
    }
  }
`

const columns = [
  {
    title: "Name",
    render: (data: image.ImageSummary) => (
      <>
        {data.name}:{data.tag}
      </>
    ),
  },
  {
    title: "URL",
    render: (data: image.ImageSummary) => (
      <>
        registry.expected.sh/{data.namespaceId}/{data.name}:{data.tag}
      </>
    ),
  },
  {
    title: "Last push",
    render: (data: image.ImageSummary) => <TimeAgo date={data.lastPush} minPeriod={10}/>,
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
  { type: "SET_IMAGES", images: client.ImageSummary[] } |
  { type: "SET_LOADING", loading: boolean } |
  { type: "SET_ERROR", error: string }

interface IState {
  loading: boolean
  images: client.ImageSummary[]
  error?: string
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      }
    case "SET_IMAGES":
      return {
        ...state,
        images: action.images,
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
  const account = useMappedState(state => state.account.account)
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    images: [],
  })

  useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true })

    client.getImages()
      .then((res) => {
        if (res.error) {
          dispatch({ type: "SET_ERROR", error: res.error.message })
        } else if (res.data) {
          dispatch({ type: "SET_IMAGES", images: res.data })
        }
      })
      .catch((error) => dispatch({ type: "SET_ERROR", error: error.message }))
      .finally(() => dispatch({ type: "SET_LOADING", loading: false }))
  }, [])

  return (
    <>
      <Header title="Images" preTitle="Overview"/>

      <Container>
        {state.error && (
          <p>Error: {state.error}...</p>
        )}
        <Loader loading={state.loading}>
          {state.images && (
            <Card>
              {state.images.length ? (
                <CardTable<image.ImageSummary> columns={columns} dataSource={state.images}
                                   onRowClick={(data) => console.log(data)}/>
              ) : (
                <NoImage>
                  <h3>Push your first image</h3>
                  <pre>
                    <div>
                      docker login registry.expected.sh -u {account.email} -p {account.apiKey}
                    </div>
                    <div>
                      docker push registry.expected.sh/{account.id}/{"<"}your image{">"}
                    </div>
                  </pre>
                </NoImage>
              )}
            </Card>
          )}
        </Loader>
      </Container>
    </>
  )
}
