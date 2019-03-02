import React, { Component } from "react"
import { Link } from "react-router-dom"
import TimeAgo from "react-timeago"
import { containers } from "../client"
import { Header, TableCard } from "../components"

interface IProps {
}

interface IState {
  containers: containers.Container[]
}

export default class ListContainer extends Component<IProps, IState> {
  public static columns = [
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
          <button className="btn btn-link dropdown-toggle" type="button" style={{padding: 0}}>
            More
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
      )
    }
  ]

  constructor(props: IProps) {
    super(props)

    this.state = {
      containers: [],
    }
  }

  public componentDidMount = () => {
    containers.list()
      .then((containers) => this.setState({ containers }))
      .catch(console.error)
  }

  public render = () => (
    <div>
      <Header title="Containers" pretitle="Overview">
        <Link to="/containers/new" className="btn btn-success">
          Create
        </Link>
      </Header>

      <TableCard<containers.Container>
        columns={ListContainer.columns}
        dataSource={this.state.containers}
        onRowClick={(data) => console.log(data)}
      />
    </div>
  )
}
