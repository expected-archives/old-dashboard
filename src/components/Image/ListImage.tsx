import React from "react"
import TimeAgo from "react-timeago"
import { Header } from "../Layout"
import { usePromise } from "../../hooks"
import { Loader } from "../Loader"
import { Card, CardBody, CardTable } from "../Card"
import { Container } from "../Responsive"
import { styled } from "../../style"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "../Dropdown"
import { useMappedState } from "redux-react-hook"
import { image } from "../../client"

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

export default () => {
  const { loading, data, error } = usePromise(async () => {
    const res = await image.getImages() as image.ListImageResponse
    if (res.images) {
      return res.images
    }
  }, [])
  const account = useMappedState(state => state.account.account)

  return (
    <>
      <Header title="Images" preTitle="Overview"/>

      <Container>
        {error && (
          <p>Error: {error.message}...</p>
        )}
        <Loader loading={loading}>
          {data && (
            <Card>
              {data.length ? (
                <CardTable<image.ImageSummary> columns={columns} dataSource={data}
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
