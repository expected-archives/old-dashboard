import React from "react"
import TimeAgo from "react-timeago"
import { container } from "../../client"
import { usePromise } from "../../hooks"
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
    render: (data: container.Container) => (
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
    render: (data: container.Container) => <TimeAgo date={data.createdAt} minPeriod={10}/>,
  },
  {
    title: "Tags",
    render: (data: container.Container) => (
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

export default () => {
  const { loading, data, error } = usePromise(async () => {
    const res = await container.getContainers() as container.ListContainerResponse
    if (res.containers) {
      return res.containers
    }
  }, [])

  return (
    <>
      <Header title="Containers" preTitle="Overview">
        <ButtonLink color="green" to="/containers/new">
          Create
        </ButtonLink>
      </Header>

      <Container>
        {error && (
          <p>Error: {error.message}...</p>
        )}
        <Loader loading={loading}>
          {data && (
            <Card>
              <CardTable<container.Container> columns={columns} dataSource={data}
                                              onRowClick={(data) => console.log(data)}/>
            </Card>
          )}
        </Loader>
      </Container>
    </>
  )
}
