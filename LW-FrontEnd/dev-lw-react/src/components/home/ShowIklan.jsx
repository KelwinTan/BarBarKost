import React, { Component } from "react";
import backBtn from "../../assets/images/kota-besar/ic_full-arrow-left_s_green.svg";

export class ShowIklan extends Component {
  render() {
    return (
      <div className="show-iklan">
        <img src={backBtn} alt="Back Btn" />
        <p>Hello</p>
      </div>
    );
  }
}

export default ShowIklan;
