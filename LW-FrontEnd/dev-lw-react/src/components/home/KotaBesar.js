import React, { Component } from "react";
import kota_surabaya from "../../assets/images/kota-besar/kota_surabaya.png";



class KotaBesar extends Component {
  render() {
    return (
      <div className="segment-kota-besar">
        <div className="segment-kota-besar-title">
          <h3 className="kota-besar-title">
            <strong>KOTA GEDE</strong>
          </h3>
          <h4 className="kota-besar-subtitle">
            Temukan rumah kost di kota favoritmu
          </h4>
        </div>
        <div className="kota-besar-gambar">
          <div className="kota-besar-gambar-row">
            <div className="kota-besar-gambar-row-card">
              <a href="#" className="kota-besar-gambar-card">
                <img src={kota_surabaya} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KotaBesar;
