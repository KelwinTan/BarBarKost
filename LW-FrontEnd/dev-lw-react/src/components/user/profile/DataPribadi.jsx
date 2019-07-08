import React, { Component } from "react";
import { register } from "../../user/login-register/UserFunctions";
import defaultProfile from "../../../assets/images/Profile/user-avatar-main-picture.png";
import { Link, Redirect } from "react-router-dom";
import {
  getProfile,
  updateProfile
} from "../../user/login-register/UserFunctions";
import LoadingScreen from "../../utilities/LoadingScreen";
import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};
export class DataPribadi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      Name: null,
      email: null,
      password: null,
      username: null,
      pictureID: null,
      phone: null,
      formErrors: {
        Name: "",
        phone: "",
        email: "",
        password: "",
        username: ""
      },
      loadingScreen: false,
      profile: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("usertoken") === null) {
      console.log("Hello");
      return <Redirect to={"/"}> </Redirect>;
    } else {
      console.log("Hello1");
      getProfile().then(res => {
        console.log(res);
        this.setState({
          id: res.user.id,
          Name: res.user.name,
          username: res.user.username,
          email: res.user.email,
          join: res.user.created_at,
          phone: res.user.phone,
          pictureID: res.user.picture_id
        });
      });
    }
  }

  profileHandler = event => {
    console.log(event.target.files);
    this.setState({
      profile: event.target.files[0]
    })
  }

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loadingScreen: true });

    // const user = {
    //   id: this.state.id,
    //   email: this.state.email,
    //   updatePassword: this.state.password,
    //   name: this.state.Name,
    //   username: this.state.username,
    //   profile: this.state.profile
    // };
    // updateProfile(user).then(res => {
    //   this.setState({ loadingScreen: false });
    // });
    const UpdateData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data"
      }
    }
    UpdateData.append('id', this.state.id);
    UpdateData.append('email', this.state.email);
    UpdateData.append('updatePassword', this.state.updatePassword);
    UpdateData.append('name', this.state.Name);
    UpdateData.append('username', this.state.username);
    UpdateData.append('profile', this.state.profile);
    UpdateData.append('phone', this.state.phone);
    axios.post("/api/users/update", UpdateData, config).then(
      res => {
        console.log(res);
        this.setState({ loadingScreen: false });

      }
    )


  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 5 && value.length > 0
            ? "Minimum 5 Characters Required"
            : "";
        break;
      case "Name":
        formErrors.Name =
          value.length < 5 && value.length > 0
            ? "Minimum 5 Characters Required"
            : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "Invalid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length < 8 && value.length > 0
            ? "Minimum 8 Characters Required"
            : "";
        break;
      case "phone":
        formErrors.phone =
          value.length < 8 && value.length > 0
            ? "Minimum 8 Characters Required"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    return (
      <div className="wrapper1">
        {this.handleLoading()}
        <div className="form-wrapper1">
          <h1>Personal Data</h1>
          <div className="data-pribadi-data">
            <img src={`http://localhost:8000/storage/${this.state.pictureID}`} alt="Picture 360" style={{ width: "500px", height: "500px" }} />
            <div className="data-pribadi-data-image" />
          </div>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="nameBox">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={
                  this.state.formErrors.username.length > 0 ? "errorBox" : null
                }
                placeholder="Input Your username"
                name="username"
                noValidate
                onChange={this.handleChange}
                value={this.state.username}
              />
              {this.state.formErrors.username.length > 0 && (
                <span className="errorMsg">{this.state.formErrors.username}</span>
              )}
            </div>
            <div className="nameBox">
              <label htmlFor="Name">Full Name</label>
              <input
                type="text"
                className={
                  this.state.formErrors.Name.length > 0 ? "errorBox" : null
                }
                placeholder="Input Your Name"
                name="Name"
                noValidate
                onChange={this.handleChange}
                value={this.state.Name}
              />
              {this.state.formErrors.Name.length > 0 && (
                <span className="errorMsg">{this.state.formErrors.Name}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={
                  this.state.formErrors.email.length > 0 ? "errorBox" : null
                }
                placeholder=""
                name="email"
                noValidate
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.formErrors.email.length > 0 && (
                <span className="errorMsg">{this.state.formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Update Password</label>
              <input
                type="password"
                className={
                  this.state.formErrors.password.length > 0 ? "errorBox" : null
                }
                placeholder="Input Your Password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            {this.state.formErrors.password.length > 0 && (
              <span className="errorMsg">{this.state.formErrors.password}</span>
            )}
            <div className="password">
              <label htmlFor="phone">Update Phone Number</label>
              <input
                type="number"
                className={
                  this.state.formErrors.phone.length > 0 ? "errorBox" : null
                }
                placeholder="Update your phone number"
                name="phone"
                noValidate
                defaultValue={this.state.phone}
                onChange={this.handleChange}
              />
            </div>
            {this.state.formErrors.phone.length > 0 && (
              <span className="errorMsg">{this.state.formErrors.phone}</span>
            )}
            <div className="input-data-lokasi">
              <div className="input-data-form">
                <label htmlFor="profilePicture">Upload Profile Picture</label>
                <input
                  type="file"
                  onChange={this.profileHandler}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="createAccount">
              <button type="submit">Update</button>
              <Link to="/profile">Go Back</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default DataPribadi;
