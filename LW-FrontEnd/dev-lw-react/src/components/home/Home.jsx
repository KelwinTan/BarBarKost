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
  render() {
    return (
      <div>
        <NavBar />
        <SliderContent />
        <KotaBesar />
        <PropertyCard />
        <HalamanPilihan />
        <ApartmentArea />
        <KostArea />
        <Footer />
      </div>
    );
  }
}

export default Home;
