import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import illustration_form from "../../../assets/images/kota-besar/Illustration-slide-2.svg";

class OwnerLogin extends Component {
  render() {
    return (
      <div className="login-owner">
        <div className="login-owner-form">
          <Link to="/">&#8592; Back to Home</Link>
          <div className="login-owner-form2">
            <img src={logo} alt="BarBar" />
            <h1>Login</h1>
            <h2>Pemilik Kos</h2>
            <form className="owner-input-form">
              <div className="owner-input-form-hp">
                <label htmlFor="insertPhoneNumber">No. Handphone</label>
                <br />
                <input type="tel" placeholder="08" />
              </div>
              <br />
              <div className="owner-input-form-hp">
                <label htmlFor="insertPhoneNumber">Password</label>
                <br />
                <input type="password" placeholder="Input Password" />
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

export default OwnerLogin;
