import React, { Component } from "react";
// import SimpleImageSlider from "react-simple-image-slider";
import Slider from "react-slick";
import slide1 from "../../assets/images/slider/Slide1.jpg";
// import slide4 from ".././Slide4.jpg";
import "../../assets/Style.scss";
import { Promo } from "../image-slider/Promo";

export class SliderContent extends Component {
  render() {
    // const settings = {
    //   infinite: true,
    //   dots: true,
    //   speed: 500,
    //   slideToShow: 1,
    //   slidesToScroll: 1
    // };
    return (
      <div className="promo-content">
        <h1>Promo</h1>
        {/* <Slider {...settings}> */}
        {/* <div>
          <img src={slide1} />
        </div>
        <div>
          <img src={slide4} />
        </div> */}
        {/* </Slider> */}
        <Promo />
      </div>
    );
  }
}

export default SliderContent;
