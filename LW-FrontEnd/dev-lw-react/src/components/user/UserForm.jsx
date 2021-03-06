import React, { Component } from "react";
import "../../assets/Style.scss";
import { register } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";
import LoadingScreen from "../utilities/LoadingScreen";

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

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      loadingScreen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loadingScreen: true });

    if (formValid(this.state)) {
      const newUser = {
        name: this.state.firstName + " " + this.state.lastName,
        email: this.state.email,
        password: btoa(this.state.password)
      };
      register(newUser).then(res => {
        this.props.history.push(`/guest-login`);
      });
      // .then(this.setState({ loadingScreen: false }));
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MSG");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    // console.log("Name:", name);
    // console.log("Value:", value);

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 && value.length > 0
            ? "Minimum 3 Characters Required"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 && value.length > 0
            ? "Minimum 3 Characters Required"
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
      case "confirmPassword":
        formErrors.confirmPassword =
          value !== this.state.password ? "Password must match" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  authenticateRedirection = () => {
    if (localStorage.getItem("usertoken") !== null) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <React.Fragment>
        {this.authenticateRedirection()}

        <div className="wrapper">
          {this.handleLoading()}
          <div className="form-wrapper">
            <h1>Create User Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={
                    formErrors.firstName.length > 0 ? "errorBox" : null
                  }
                  placeholder="Input Your First Name"
                  name="firstName"
                  noValidate
                  onChange={this.handleChange}
                  autoFocus
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMsg">{formErrors.firstName}</span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={formErrors.lastName.length > 0 ? "errorBox" : null}
                  placeholder="Input Your Last Name"
                  name="lastName"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMsg">{formErrors.lastName}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={formErrors.email.length > 0 ? "errorBox" : null}
                  placeholder="Input Your Email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMsg">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={formErrors.password.length > 0 ? "errorBox" : null}
                  placeholder="Input Your Password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
              {formErrors.password.length > 0 && (
                <span className="errorMsg">{formErrors.password}</span>
              )}
              <div className="confirmPassword">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={
                    formErrors.confirmPassword.length > 0 ? "errorBox" : null
                  }
                  placeholder="Confirm Your Password"
                  name="confirmPassword"
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
              {formErrors.confirmPassword.length > 0 && (
                <span className="errorMsg">{formErrors.confirmPassword}</span>
              )}
              <div className="createAccount">
                <button type="submit">Create Account</button>
                <Link to="/guest-login">
                  <small>Already Have An Account ?</small>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserForm;
