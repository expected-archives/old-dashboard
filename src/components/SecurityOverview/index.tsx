import React, {Component} from "react";
import Header from "../Header";
import Card from "../Card";

interface KeyPair {
  name: string
  fingerprint: string
}

interface SecurityGroup {
  id: string
  name: string
  description: string
  vpc_id: string
}

interface IState {
  keyPairs?: KeyPair[]
  securityGroups?: SecurityGroup[]
  error?: Error
}

export default class SecurityOverview extends Component<{}, IState> {
  static securityGroupsColumns = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Description",
      key: "description",
    },
    {
      title: "VPC ID",
      key: "vpc_id",
    },
  ];
  static keyPairsColumns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Fingerprint",
      key: "fingerprint",
    },
  ];

  constructor(props: {}) {
    super(props);
    this.state = {}
  }

  async componentWillMount() {
    try {
      const securityGroupRes = await fetch("http://localhost:8080/security/security_groups")
      const securityGroupData = await securityGroupRes.json()
      const keyPairRes = await fetch("http://localhost:8080/security/key_pairs")
      const keyPairData = await keyPairRes.json()

      this.setState({
        keyPairs: keyPairData.key_pairs,
        securityGroups: securityGroupData.security_groups,
      })
    } catch (error) {
      this.setState({error})
    }
  }

  render = () => (
    <div className="overview">
      <Header preTitle="Overview" title="Security"/>

      {this.state.error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {this.state.error.message}
        </div>
      )}

      <Card title="(AWS) Security Groups">
        {this.state.securityGroups && (
          <Card.Table<SecurityGroup> columns={SecurityOverview.securityGroupsColumns}
                                     dataSource={this.state.securityGroups}/>
        )}
      </Card>

      <Card title="(AWS) Key Pairs">
        {this.state.keyPairs && (
          <Card.Table<KeyPair> columns={SecurityOverview.keyPairsColumns} dataSource={this.state.keyPairs}/>
        )}
      </Card>
    </div>
  )
}
