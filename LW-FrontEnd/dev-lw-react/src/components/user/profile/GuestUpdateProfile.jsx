import React, { Component } from "react";
import { UserNav } from "../navbar/UserNav";
import { DataPribadi } from "./DataPribadi";
import { getProfile } from "./../login-register/UserFunctions";
import { Redirect } from "react-router-dom";
import BreadCrumbs from "../../utilities/BreadCrumbs";
import Footer from "../../home/Footer";

export class GuestUpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      updatePassword: "",
      loadingScreen: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("usertoken") === null) {
      console.log("Hello");
      return <Redirect to={"/"}> </Redirect>;
    } else {
      console.log("Hello1");
    }
  }
  authenticateRedirection = () => {
    if (localStorage.getItem("usertoken") === null) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.authenticateRedirection()}
        <div>
          <UserNav />
          <DataPribadi />
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default GuestUpdateProfile;
