import React, { Component } from "react";
import kost_area from "../../assets/images/kota-besar/ic_cat_kost.png";

const divStyle = {
  height: "auto",
  paddingBottom: "50px",
  width: "900px",
  margin: "0 auto"
};

const apartStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
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
          <img src={kost_area} alt="Kost" />
        </div>
        <div style={titleStyle}>
          <h1 style={hStyle}>Kost Area</h1>
          <h3 style={h3Style}>Cari kos kosan di area kost yang kamu mau</h3>
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
