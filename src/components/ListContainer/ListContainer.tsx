import { usePromise } from "../../hooks"
import { getContainers, IContainer } from "../../client"
import React from "react"
import { Header } from ".."
import { Container } from "../Responsive"
import { Link } from "react-router-dom"
import TimeAgo from "react-timeago"
import { Card, CardTable } from "../Card"
import Loader from "../Loader"

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
    render: () => (
      <div className="dropdown">
        <button className="btn btn-link dropdown-toggle" type="button" style={{ padding: 0 }}>
          More
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    ),
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
