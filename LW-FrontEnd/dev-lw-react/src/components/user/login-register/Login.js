import React, { Component } from "react";
import { login } from "./UserFunctions";
import { Link } from "react-router-dom";

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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    // console.log("Name:", name);
    // console.log("Value:", value);

    switch (name) {
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "Invalid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "Minimum 6 Characters Required"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      console.log(res);
      if (res) {
        console.log(res);
        localStorage.setItem("usertoken", res.data.token);

        this.props.history.push(`/profile`);
      }
    });
  }

  render() {
    const { formErrors } = this.state;
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Please Login</h1>
            <form onSubmit={this.onSubmit} noValidate>
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
              <div className="createAccount">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
