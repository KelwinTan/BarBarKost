import React, { Component } from "react";

export class Facilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fac: ""
    };
  }

  handleUpdate = e => {
    // console.log("Test");
    // this.setState({ fac: "Test" });
    // console.log(this.state.fac);
    // this.props.handleFac(this.state.fac);
    console.log(e);
  };

  render() {
    return (
      <div>
        <input type="checkbox" value="WiFi" onClick={this.handleUpdate} />
        <span>WiFi</span>
      </div>
    );
  }
}

export default Facilities;
