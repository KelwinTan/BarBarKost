import React, { Component } from "react";

class CariIklan extends Component {
  constructor() {
    super();
    this.state = { displayIklan: false };
    this.showIklan = this.showIklan.bind(this);
    this.hideIklan = this.hideIklan.bind(this);
  }

  showIklan(event) {
    event.preventDefault();
    this.setState({ displayIklan: true }, () => {
      document.addEventListener("click", this.hideIklan);
    });
  }

  hideIklan() {
    this.setState({ displayIklan: false }, () => {
      document.removeEventListener("click", this.hideIklan);
    });
  }

  render() {
    return (
      <div
        className="dropdown"
        style={{ backgroundColor: "transparent", width: "200px" }}
      >
        <div className="button" onClick={this.showIklan}>
          Cari Iklan
        </div>
        {this.state.displayIklan ? (
          <ul>
            <li>
              <a href="#Cari Kost">Cari Kost</a>
            </li>
            <li>
              <a href="#Cari Apartment">Cari Apartment</a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default CariIklan;
