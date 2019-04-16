import React from "react"
import { Header } from "../Layout"
import { usePromise } from "../../hooks"
import { getImages, IImage } from "../../client"
import { Loader } from "../Loader"
import { Card, CardBody, CardTable } from "../Card"
import { Container } from "../Responsive"
import { styled } from "../../style"
import TimeAgo from "react-timeago"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "../Dropdown"
import { useMappedState } from "redux-react-hook"

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
  // {
  //   render: () => (
  //     <img src={require("./test.svg")} style={{
  //       marginRight: 15,
  //       border: "1px solid red",
  //       borderRadius: "50%",
  //       height: 42,
  //       padding: 5,
  //     }}/>
  //   ),
  // },
  {
    title: "Name",
    key: "name",
    render: (name: any) => (
      <>
        {name}
      </>
    ),
  },
  {
    title: "Image",
    key: "image",
  },
  {
    title: "Created",
    key: "createdAt",
    render: (createdAt: any) => <TimeAgo date={createdAt} minPeriod={10}/>,
  },
  {
    title: "Tags",
    key: "tags",
    render: (tags: any) => (
      <>
      </>
    ),
  },
  {
    title: "",
    key: "",
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

// <CardTable<IImage> columns={columns} dataSource={data}/>
export default () => {
  const { loading, data, error } = usePromise(() => getImages(), [])
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
                <p>Ok</p>
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
