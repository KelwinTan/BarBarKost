import React, { Component } from "react";
import "./Home.scss";
import { Promo } from "./Promo";

export class SliderContent extends Component {
  render() {
    return (
      <div className="promo-content">
        <h1>Promo</h1>
        <Promo />
      </div>
    );
  }
}

export default SliderContent;
