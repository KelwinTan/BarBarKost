import React, { Component } from "react";
import apartment_area from "../../assets/images/kota-besar/apartment_area.png";

const divStyle = {
  height: "auto",
  paddingTop: "20px"
};

const apartStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const titleStyle = {
  textAlign: "center"
};

const hStyle = {
  fontSize: "3em",
  color: "#27ab27"
};

const h3Style = {
  fontSize: "1.4em"
};

class KostArea extends Component {
  render() {
    return (
      <div style={divStyle}>
        <div style={apartStyle}>
          <img src={apartment_area} alt="Apartment" />
        </div>
        <div style={titleStyle}>
          <h1 style={hStyle}>APARTMENT AREA</h1>
          <h3 style={h3Style}>Cari apartemen di area yang kamu mau</h3>
        </div>
        <div className="area-box-parent">
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Surabaya
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartment Puncak Permai</a>
              <a href="#child1">Apartemen Puncak Kertajaya</a>
              <a href="#child1">Apartemen Mediterania Gajah Mada</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Bekasi
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Mutiara Bekasi</a>
              <a href="#child1">Apartemen Kemang View</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Semarang
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Mutiara Garden</a>
              <a href="#child1">Apartemen Louis Kienne</a>
              <a href="#child1">Apartemen Star</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Jakarta Pusat
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Sudirman Park</a>
              <a href="#child1">Apartemen Green Pramuka</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Jakarta Pusat
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Sudirman Park</a>
              <a href="#child1">Apartemen Green Pramuka</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Jakarta Pusat
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Sudirman Park</a>
              <a href="#child1">Apartemen Green Pramuka</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Jakarta Pusat
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Sudirman Park</a>
              <a href="#child1">Apartemen Green Pramuka</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Jakarta Pusat
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Sudirman Park</a>
              <a href="#child1">Apartemen Green Pramuka</a>
            </div>
          </div>
          <div className="area-box">
            <a href="#surabaya" className="area-title">
              Jakarta Pusat
            </a>
            <div className="area-box-child">
              <a href="#child1">Apartemen Sudirman Park</a>
              <a href="#child1">Apartemen Green Pramuka</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KostArea;
