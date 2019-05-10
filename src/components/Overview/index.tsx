import React, {Component} from "react";
import Header from "../Header";
import Card from "../Card";

interface ILol {
  name: string
  image: string
}

const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Image",
    key: "image",
  }
];

const ds = [
  {
    name: "hello world",
    image: "ok",
  },
  {
    name: "hello world",
    image: "ok",
  },
  {
    name: "hello world",
    image: "ok",
  }
]

export default class Overview extends Component {
  render = () => (
    <div className="overview">
      <Header title="Overview"/>

      <Card >
        <Card.Table<ILol> dataSource={ds} columns={columns}/>
      </Card>
    </div>
  )
}
