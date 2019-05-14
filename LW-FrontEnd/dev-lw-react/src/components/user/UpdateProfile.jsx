import React, { Component } from "react";
import { updateProfile } from "./login-register/UserFunctions";
import { UserNav } from "./navbar/UserNav";
import { DataPribadi } from "./profile/DataPribadi";
import { getProfile } from "./login-register/UserFunctions";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      updatePassword: "",
      loadingScreen: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      updatePassword: this.state.updatePassword
    };
    console.log(user);
    this.setState({ loadingScreen: true });
    updateProfile(user).then(this.setState({ loadingScreen: false }));
    console.log("Nice");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <UserNav />
        <DataPribadi name={this.state.name} />
        {/* {this.state.loadingScreen ? (
          <LoadingScreen />
        ) : (
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
        )} */}
      </React.Fragment>
    );
  }
}

export default UpdateProfile;
