import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import illustration_form from "../../../assets/images/kota-besar/Illustration-slide-2.svg";
import { loginOwner } from "./UserFunctions";
import LoadingScreen from "../../utilities/LoadingScreen";

class OwnerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      formErrors: {
        phone: "",
        password: ""
      },
      loadingScreen: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loadingScreen: true });
    const user = {
      phone: this.state.phone,
      password: btoa(this.state.password),
      rememberMe: this.refs.remember.checked
    };

    loginOwner(user).then(res => {
      console.log(res);
      if (res) {
        console.log(res);
        localStorage.setItem("usertoken", res.data.token);
        this.props.history.push(`/owner-dashboard`);
      }
    });
  }

  authenticateRedirection = () => {
    if (localStorage.getItem("usertoken") !== null) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    // console.log("Name:", name);
    // console.log("Value:", value);

    switch (name) {
      case "phone":
        formErrors.phone =
          value.length < 10 && value.length > 0
            ? "Minimum 10 Characters Required"
            : "";
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
    const { formErrors } = this.state;

    return (
      <React.Fragment>
        {this.authenticateRedirection()}
        <div className="login-owner">
          {this.handleLoading()}
          <div className="login-owner-form">
            <Link to="/">&#8592; Back to Home</Link>
            <div className="login-owner-form2">
              <img src={logo} alt="BarBar" />
              <h1>Login</h1>
              <h2>Pemilik Kos</h2>
              <form className="owner-input-form" onSubmit={this.onSubmit}>
                <div className="owner-input-form-hp">
                  {formErrors.phone.length > 0 && (
                    <span className="errorMsg">{formErrors.phone}</span>
                  )}
                  <input
                    type="number"
                    placeholder="08"
                    name="phone"
                    onChange={this.handleChange}
                    autoFocus
                  />
                  <label htmlFor="phone">No. Handphone</label>
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
                <input type="checkbox" name="rememberMe" ref="remember" />
                <label htmlFor="rememberMe">Remember Me</label>
                <div className="createAccount">
                  <button type="submit" style={{ background: "orangered" }}>
                    Owner Login
                  </button>
                  <Link
                    to="/owner-register"
                    style={{
                      background: "orangered",
                      color: "white",
                      textAlign: "center",
                      padding: "5px"
                    }}
                  >
                    Owner Registration
                  </Link>
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
      </React.Fragment>
    );
  }
}

export default OwnerLogin;
