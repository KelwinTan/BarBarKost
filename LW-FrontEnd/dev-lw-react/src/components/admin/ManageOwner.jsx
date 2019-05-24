import React, { Component } from "react";
import { getGuestData } from "./AdminFunctions";
import { getProfile } from "../user/login-register/UserFunctions";
import { Redirect } from "react-router-dom";

export class ManageOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kostName: "",
      kost: [],
      email: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("usertoken") === null) {
      console.log("Hello");
      return <Redirect to={"/"}> </Redirect>;
    } else {
      console.log("Hello1");
      getProfile().then(res => {
        console.log(res);
        this.setState({
          name: res.user.name,
          email: res.user.email,
          join: res.user.created_at,
          pictureID: res.user.picture_id,
          email_verify_at: res.user.email_verified_at,
          phone_verify_at: res.user.phone_verified_at,
          phone: res.user.phone
        });
      });
    }
  }

  render() {
    return (
      <div>
        {console.log(this.state.kost)}
        <div className="property-card">
          {this.state.kost.map(item =>
            item["id"] !== null ? (
              <a href="http://google.com" key={item}>
                <div className="card-kost">
                  <img src="" alt="kost 1" />
                  <div className="card-kost-container">
                    <h4>{item["name"]}</h4>
                    <div className="card-kost-images">
                      {item["address"] + " " + item["additional_fees"]}
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    );
  }
}

export default ManageOwner;
