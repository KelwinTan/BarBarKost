import React, { Component } from "react";

class TestDropDown extends Component {
  render() {
    return (
      <div>
        <nav className="nav-main">
          <div className="logo">Website</div>
          <ul>
            <li>
              <a href="#" className="nav-item">
                Amazing
              </a>
              <div className="nav-content">
                <div className="nav-sub">
                  <ul>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Do you really care what is here?</a>
                    </li>
                    <li>
                      <a href="#">Of course you do !</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <a href="#" className="nav-item">
                CSS
              </a>
            </li>
            <li>
              <a href="https://www.codecourse.com" className="nav-item">
                CodeCourse
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TestDropDown;
