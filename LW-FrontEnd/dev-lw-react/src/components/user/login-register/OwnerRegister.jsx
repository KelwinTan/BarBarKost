import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import illustration_form from "../../../assets/images/kota-besar/Illustration-slide-2.svg";
import { registerOwner } from "./UserFunctions";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class OwnerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      handphone: "",
      formErrors: {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        handphone: ""
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
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
      case "name":
        formErrors.name =
          value.length < 8 && value.length > 0
            ? "Name must be greater than 8 Characters"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "Minimum 6 Characters Required"
            : "";
        break;
      case "handphone":
        formErrors.handphone =
          value.length < 10 && value.length > 0
            ? "HP minimum 10 Characters Required"
            : "";
        break;
      case "confirmPass":
        formErrors.confirmPass =
          value !== this.state.password ? "Password must match" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loadingScreen: true });
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.handphone
    };

    registerOwner(user).then(res => {
      this.props.history.push(`/owner-form`);
    });
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="login-owner">
        <div className="login-owner-form">
          <Link to="/">&#8592; Back to Home</Link>
          <div className="login-owner-form2">
            <h1>Register</h1>
            <h2>Pemilik Kos</h2>
            <form className="owner-input-form" onSubmit={this.onSubmit}>
              <div className="owner-input-form-hp">
                {formErrors.name.length > 0 && (
                  <span className="errorMsg">{formErrors.name}</span>
                )}
                <input
                  type="text"
                  placeholder="Input Name"
                  className={formErrors.name.length > 0 ? "errorBox" : null}
                  name="name"
                  onChange={this.handleChange}
                />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="owner-input-form-hp">
                {formErrors.email.length > 0 && (
                  <span className="errorMsg">{formErrors.email}</span>
                )}
                <input
                  type="email"
                  placeholder="Input Email"
                  name="email"
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="owner-input-form-hp">
                {formErrors.handphone.length > 0 && (
                  <span className="errorMsg">{formErrors.handphone}</span>
                )}
                <input
                  type="number"
                  placeholder="08"
                  name="handphone"
                  onChange={this.handleChange}
                />
                <label htmlFor="handphone">No. Handphone</label>
              </div>

              <div className="owner-input-form-hp">
                {formErrors.password.length > 0 && (
                  <span className="errorMsg">{formErrors.password}</span>
                )}
                <input
                  type="password"
                  placeholder="Input Password"
                  name="password"
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="owner-input-form-hp">
                {formErrors.confirmPass.length > 0 && (
                  <span className="errorMsg">{formErrors.confirmPass}</span>
                )}
                <input
                  type="password"
                  placeholder="Repeat Password"
                  name="confirmPass"
                  onChange={this.handleChange}
                />
                <label htmlFor="confirmPass">Confirm Password</label>
              </div>
              <div className="createAccount">
                <button type="submit" style={{ background: "orangered" }}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="login-owner-right">
          <img src={illustration_form} alt="BarBarKost Form" />
          <h3>Mau Iklan mu tampil di atas ?</h3>
          <h3>Jadilah Premium Member BarBar Kost</h3>
        </div>
      </div>
    );
  }
}

export default OwnerRegister;
