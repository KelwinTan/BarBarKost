import React, { Component } from "react";
import { register } from "../../user/login-register/UserFunctions";
import img from "../../../assets/images/email.png";
import { Link, Redirect } from "react-router-dom";
import {
  getProfile,
  updateProfile
} from "../../user/login-register/UserFunctions";
import LoadingScreen from "../../utilities/LoadingScreen";

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
      Name: null,
      email: null,
      password: null,
      formErrors: {
        Name: "",
        email: "",
        password: ""
      },
      loadingScreen: false
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
          Name: res.user.name,
          email: res.user.email,
          join: res.user.created_at,
          pictureID: res.user.picture_id
        });
      });
    }
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

    // if (formValid(this.state)) {
    const user = {
      email: this.state.email,
      updatePassword: this.state.password
    };
    updateProfile(user).then(res => {
      // console.log(res);
      // return <Redirect to={"/guest-update"}> </Redirect>;
      this.setState({ loadingScreen: false });
    });
    // } else {
    // console.error("FORM INVALID - DISPLAY ERROR MSG");
    // }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
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
            <img src={img} alt="profile" />
            <div className="data-pribadi-data-image" />
          </div>
          <form onSubmit={this.handleSubmit} noValidate>
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
            <div className="createAccount">
              <button type="submit">Update</button>
              <Link to="/">Go Back</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default DataPribadi;
