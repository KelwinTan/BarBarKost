import React, { Component } from "react";
import { SliderContent } from "./SliderContent";
import { Footer } from "./Footer";
import NavBar from "./NavBar";
import KotaBesar from "./KotaBesar";
import HalamanPilihan from "./HalamanPilihan";
import ApartmentArea from "./ApartmentArea";
import KostArea from "./KostArea";
import PropertyCard from "./PropetyCard";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketSend: ""
    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <SliderContent />
        <KotaBesar />
        <PropertyCard />
        <PropertyCard />
        <HalamanPilihan />
        <ApartmentArea />
        <KostArea />
        <Footer />
        <button onClick={this.props.socketSend}>Click Me to Send</button>
      </div>
    );
  }
}

export default Home;
