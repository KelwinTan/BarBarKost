import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import "./Home";

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  clickHam = () => {
    this.state.showMenu === false
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
    console.log(this.state.showMenu);
  };

  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" style={{ height: "45px" }} />
            <label>BarBar Kost</label>
          </Link>
        </div>
        <nav className={this.state.showMenu === true ? "active" : ""}>
          <ul>
            <li>
              <a href="#">Cari Iklan</a>
            </li>
            <li>
              <a href="#">Promosikan Iklan Anda</a>
            </li>
            <li className="sub-menu">
              <a href="#">Username</a>
            </li>
          </ul>
        </nav>
        <div className="navbar-menu-toggle" onClick={this.clickHam}>
          <i className="fas fa-bars" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default NavigationBar;
