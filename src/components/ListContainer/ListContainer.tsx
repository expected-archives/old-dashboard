import { usePromise } from "../../hooks"
import { getContainers, IContainer } from "../../client"
import React from "react"
import { Header } from ".."
import { Container } from "../Responsive"
import { Link } from "react-router-dom"
import TimeAgo from "react-timeago"
import { Card, CardBody, CardTable } from "../Card"
import Loader from "../Loader"
import { Dropdown, DropdownButton, DropdownContent, DropdownItem } from "../Dropdown"

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
        {tags.map((tag: string, index: number) => (
          <div key={index} className="tag">{tag}</div>
        ))}
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

export default () => {
  const { loading, data, error } = usePromise(() => getContainers(), [])

  return (
    <>
      <Header title="Containers" preTitle="Overview">
        <Link to="/containers/new" className="btn btn-success">
          Create
        </Link>
      </Header>

      <Container>
        {error && (
          <p>Error: {error.message}...</p>
        )}
        <Loader loading={loading}>
          {data && (
            <Card>
              <CardTable<IContainer> columns={columns} dataSource={data}
                                     onRowClick={(data) => console.log(data)}/>
            </Card>
          )}
        </Loader>
      </Container>
    </>
  )
}
