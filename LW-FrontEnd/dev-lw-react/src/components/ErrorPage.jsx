import React, { Component } from "react";
import "./ErrorStyles.scss";
import logo from "../assets/images/logo.png";
import { Footer } from "./home/Footer";
import { Link } from "react-router-dom";

class ErrorPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="promosi-kost">
          <div className="navbar-header">
            <div className="navbar-wrapper2">
              <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo-image" />
                <a href="/" style={{ color: "white" }}>
                  BarBar Kost
                </a>
              </div>
            </div>
          </div>
          <div className="error-page-wrapper">
            <div className="error-page-404">
              <h1>404 Page Not Found</h1>
              <Link to="/">Home Page</Link>
            </div>
          </div>
        </div>
        <div style={{ background: "white" }}>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default ErrorPage;
