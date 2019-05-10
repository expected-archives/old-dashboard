import React, {Component} from "react";
import Header from "../Header";
import Card from "../Card";

interface SecurityGroup {
  id: string
  name: string
  description: string
  vpc_id: string
}

interface IState {
  error?: Error
}

export default class CredentialsOverview extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {}
  }

  async componentWillMount() {
    try {
      // const securityGroupRes = await fetch("http://localhost:8080/security/security_groups")
      // const securityGroupData = await securityGroupRes.json()
      // const keyPairRes = await fetch("http://localhost:8080/security/key_pairs")
      // const keyPairData = await keyPairRes.json()
      //
      // this.setState({
      //   keyPairs: keyPairData.key_pairs,
      //   securityGroups: securityGroupData.security_groups,
      // })
    } catch (error) {
      this.setState({error})
    }
  }

  render = () => (
    <div className="overview">
      <Header preTitle="Overview" title="Credentials"/>

      {this.state.error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {this.state.error.message}
        </div>
      )}
    </div>
  )
}
