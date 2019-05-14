import React, { Component } from "react";
import slide1 from "../../assets/images/slider/Slide1.jpg";
import slide2 from "../../assets/images/slider/Slide2.jpg";
import slide3 from "../../assets/images/slider/Slide3.jpg";
import slide4 from "../../assets/images/slider/Slide4.jpg";

export class Promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 4,
      property: slide1
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    var intervalID = setInterval(this.timer, 4000);
    this.setState({ intervalID: intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  timer() {
    // this.setState({ currentCount: this.state.currentCount - 1 });
    var newCount = this.state.currentCount - 1;
    if (newCount >= 0) {
      switch (newCount) {
        case 1:
          this.setState({
            currentCount: newCount,
            property: slide2
          });
          break;
        case 2:
          this.setState({
            currentCount: newCount,
            property: slide3
          });
          break;
        case 3:
          this.setState({
            currentCount: newCount,
            property: slide4
          });
          break;
        default:
          this.setState({
            currentCount: newCount,
            property: slide1
          });
          break;
      }
    } else {
      //   clearInterval(this.state.intervalID);
      this.setState({ currentCount: 4 });
    }
  }

  render() {
    return (
      <div className="promo-slider">
        {/* {this.state.currentCount} */}
        {/* {this.state.property} */}
        {/* <img src={this.state.property} /> */}
        <img
          src={this.state.property}
          alt="Promo Slides"
          style={{ height: "250px", zIndex: "-1" }}
        />
      </div>
    );
  }
}

export default Promo;
