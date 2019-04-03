import { usePromise } from "../../hooks"
import { Container, getContainers } from "../../client"
import React from "react"
import { Header, TableCard } from ".."
import { Link } from "react-router-dom"
import TimeAgo from "react-timeago"

const columns = [
  {
    title: "Name",
    key: "name",
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
          <span key={index} className="tag">{tag}</span>
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
    <div>
      <Header title="Containers" preTitle="Overview">
        <Link to="/containers/new" className="btn btn-success">
          Create
        </Link>
      </Header>

      {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>Error: {error.message}...</p>
      )}
      {data && (
        <>
          <TableCard<Container>
            columns={columns}
            dataSource={data}
            onRowClick={(data) => console.log(data)}
          />
        </>
      )}
    </div>
  )
}
