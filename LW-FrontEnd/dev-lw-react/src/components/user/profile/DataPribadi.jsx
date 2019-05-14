import React, { Component } from "react";
import { register } from "../../user/login-register/UserFunctions";
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
        password: "",
        confirmPassword: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const newUser = {
        name: this.state.Name,
        email: this.state.email,
        password: this.state.password
      };
      register(newUser).then(res => {
        this.props.history.push(`/login`);
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MSG");
    }
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
      case "confirmPassword":
        formErrors.confirmPassword =
          value !== this.state.password ? "Password must match" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    return (
      //   <div className="data-pribadi-wrapper">
      //     <div className="data-pribadi-title">
      //       <h1>Data Pribadi</h1>
      //     </div>
      //     <div className="data-pribadi-data">
      //       <div className="data-pribadi-data-image">
      //         <img src="" alt="profile picture" />
      //       </div>
      //       <div className="data-pribadi-form">
      //         <form action="">
      //           <label htmlFor="name">Nama Lengkap</label>
      //           <input type="text" placeholder="Type in Full Name" />
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      <div className="wrapper1">
        <div className="form-wrapper">
          <h1>Personal Data</h1>
          <div className="data-pribadi-data">
            <img src="" alt="profile" />
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
                value={this.props.email}
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
              <button type="submit">Simpan</button>
              <button type="submit">Batal</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default DataPribadi;
