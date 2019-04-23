import React, { Component } from "react";
import { getProfile } from "./UserFunctions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    getProfile().then(res => {
      console.log(res);
      this.setState({
        name: res.user.name,
        email: res.user.email
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{this.state.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.email}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{this.state.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
