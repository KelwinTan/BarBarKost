import React, { Component } from "react";
import { getProfile } from "./UserFunctions";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      join: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    getProfile().then(res => {
      console.log(res);
      this.setState({
        name: res.user.name,
        email: res.user.email,
        join: res.user.created_at,
        pictureID: res.user.picture_id
      });
    });
  }

  render() {
    return (
      <div>
        <Link to="update-profile">Update Profile</Link>
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
              <td>Join Since</td>
              <td>{this.state.join}</td>
            </tr>
            <tr>
              <td>Picture ID</td>
              <td>{this.state.pictureID}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
