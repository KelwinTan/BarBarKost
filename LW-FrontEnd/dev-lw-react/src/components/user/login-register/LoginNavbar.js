import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class LoginNavbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <a href="/" onClick={this.logOut.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span />
        </button>
        <div id="navbar1">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(LoginNavbar);
