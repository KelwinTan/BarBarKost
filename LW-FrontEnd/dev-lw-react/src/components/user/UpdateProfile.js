import React, { Component } from "react";
import Profile from "./login-register/Profile";
import { updateProfile } from "./login-register/UserFunctions";
import { verifyEmail } from "./login-register/UserFunctions";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      updatePassword: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      updatePassword: this.state.updatePassword
    };
    console.log(user);
    updateProfile(user);
    console.log("Nice");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Profile />
          <div>
            <h1>Update Profile</h1>
            <form onSubmit={this.onSubmit} noValidate>
              <label htmlFor="email">Update Email</label>
              <input
                type="email"
                name="email"
                placeholder="Update Your Email"
                onChange={this.onChange}
              />
              <label htmlFor="updatePassword">Update Password</label>
              <input
                type="password"
                name="updatePassword"
                placeholder="Update Your Password"
                onChange={this.onChange}
              />

              <br />
              <button type="submit">Update Profile</button>
            </form>
            <button onClick={verifyEmail}>Verify Email</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdateProfile;
