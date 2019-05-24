import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class ManageGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (localStorage.getItem("usertype") === 3) {
      console.log("object");
    }
  }

  render() {
    return <div />;
  }
}

export default ManageGuest;
