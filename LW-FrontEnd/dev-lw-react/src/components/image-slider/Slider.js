import React, { Component } from "react";
import Card from "./Card";
import data from "./data";
// import logo from '../../assets/images/slider/icons'
import "../../assets/Style.scss";

export class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 10,
      properties: data.properties,
      property: data.properties[0]
    };
    this.nextProperty = this.nextProperty.bind(this);
    this.prevProperty = this.prevProperty.bind(this);
    this.timer = this.timer.bind(this);
  }
  nextProperty = () => {
    const newIndex = this.state.property.index + 1;
    this.setState({
      property: data.properties[newIndex]
    });
  };

  prevProperty = () => {
    const newIndex = this.state.property.index - 1;
    this.setState({
      property: data.properties[newIndex]
    });
  };

  componentDidMount() {
    var intervalID = setInterval(this.timer, 5000);
    this.setState({ intervalID: intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  timer() {
    // this.setState({ currentCount: this.state.currentCount - 1 });
    var newCount = this.state.currentCount - 1;
    if (newCount >= 0) {
      this.setState({
        currentCount: newCount,
        property: data.properties[newCount]
      });
    } else {
      //   clearInterval(this.state.intervalID);
      this.setState({ currentCount: 10 });
    }
  }

  render() {
    const { properties, property } = this.state;

    return (
      <div className="Slider">
        <button
          onClick={() => this.nextProperty()}
          disabled={property.index === data.properties.length - 1}
        >
          Next
        </button>
        <button
          onClick={() => this.prevProperty()}
          disabled={property.index === 0}
        >
          Prev
        </button>
        <div className="page">
          <section>
            {this.state.currentCount}
            <h1>Image Slideshow</h1>
          </section>
          {/* <div className={`cards-slider active-slide - ${property.index}`}>
            <div
              className="cards-slider-wrapper"
              style={{
                transform: `translateX(-${property.index *
                  (100 / properties.length)})%`
              }}
            >
              {properties.map(property => (
                <Card key={property._id} property={property} />
              ))}
            </div>
          </div> */}
          <Card property={property} />
        </div>
      </div>
    );
  }
}

export default Slider;
