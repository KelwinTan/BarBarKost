import React, { Component } from "react";
import L from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { ENGINE_METHOD_DIGESTS } from "constants";
import axios from "axios";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

// function onLocationFound(e) {
//   // if position defined, then remove the existing position marker and accuracy circle from the map
//   if (current_position) {
//     map.removeLayer(current_position);
//     map.removeLayer(current_accuracy);
//   }

//   var radius = e.accuracy / 2;

//   current_position = L.marker(e.latlng)
//     .addTo(map)
//     .bindPopup("You are within " + radius + " meters from this point")
//     .openPopup();

//   current_accuracy = L.circle(e.latlng, radius).addTo(map);
// }

class MyLeaflet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: L.popup(),
      Map: null,
      current_position: null,
      current_accuracy: null,
      Marker: null,
      GeoCode: null,
      ReverseResult: null
    };
  }

  onLocationFound = e => {
    if (this.state.current_position) {
      this.state.Map.removerLayer(this.state.current_position);
      // this.state.Map.removerLayer(this.state.current_accuracy);
    }

    var radius = e.accuracy / 2;
    this.state.Marker = L.circleMarker(e.latlng);
    this.state.current_position = this.state.Marker.addTo(this.state.Map)
      .bindPopup("Your Location")
      .openPopup();
    // this.state.current_accuracy = L.circleMarker(e.latlng, radius).addTo(
    //   this.state.Map
    // );

    // this.state.Marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(
    //   this.state.Map
    // );
    // console.log(e.latlng.lng);
    // console.log(e.latlng.lat);
  };

  // GeoService = (error, result) =>{
  //   this.state.Marker.setLatLng(result.latlng);
  //   this.state.popup.setLatLng(result.latlng).setContent(result.address.Match_addr).openOn)
  // }

  onMapClick = e => {
    // this.state.GeoCode.reverse()
    //   .latlng(e.latlng)
    //   .run();
    axios
      .post(
        `https://us1.locationiq.com/v1/reverse.php?key=899758dd3d8f41&lat=${
          e.latlng.lat
        }&lon=${e.latlng.lng}&format=json`
      )
      .then(res => {
        this.setState({
          ReverseResult: res.data
        });
        // console.log(this.state.ReverseResult);
      });
    this.props.updateAddr(this.state.ReverseResult);
    // var jsonString = https://us1.locationiq.com/v1/reverse.php?key=899758dd3d8f41&lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json
    this.state.popup
      .setLatLng(e.latlng)
      .setContent("Your Location at " + e.latlng.toString())
      .openOn(this.state.Map);
    // e.latlng.toString())
    this.state.Marker.setLatLng(e.latlng);
  };

  onLocationError = e => {
    alert(e.message);
  };

  componentDidMount(e) {
    this.state.Map = L.map("map", {
      center: [58, 16],
      zoom: 6,
      zoomControl: false
    }).locate({ setView: true, maxZoom: 16 });
    // this.state.GeoCode = L.esri.Geocoding.geocodeService();

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1Ijoia2Vsd2ludGFudG5vbm8iLCJhIjoiY2p2ZjRhb3hnMnFpNTN5bnRudnhrbzNvZCJ9.73zwIU-iVszXPRlPDPRLhw"
      }
    ).addTo(this.state.Map);

    this.state.Map.on("locationfound", this.onLocationFound);
    this.state.Map.on("click", this.onMapClick);
  }

  componentDidUpdate(e) {
    this.state.Map.on("locationerror", this.onLocationError);
  }

  render() {
    return <Wrapper width="1000px" height="500px" id="map" />;
  }
}

export default MyLeaflet;
