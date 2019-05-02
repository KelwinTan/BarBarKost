import React, { Component } from "react";
import kost_terbaru from "../../assets/images/kota-besar/kost_terbaru.png";
import promo_event from "../../assets/images/kota-besar/promo_event.png";
import promo_kost from "../../assets/images/kota-besar/promo_kost.png";

class HalamanPilihan extends Component {
  render() {
    return (
      <div className="segment" style={{ height: "320px", width: "100%" }}>
        <div className="title-group">
          <h3 className="as-title">
            <strong>HALAMAN PILIHAN</strong>
          </h3>
          <h4 className="as-subtitle">Pilihan kost spesial untuk kamu</h4>
        </div>
        <div className="big-city">
          <div className="row">
            <div className="col-sm-6  col-md-4 cards">
              <a href="#" className="card material-card-1">
                <img src={promo_kost} />
                <span>Promo dari Kost</span>
              </a>
            </div>
            <div className="col-sm-6  col-md-4 cards">
              <a href="#" className="card material-card-1">
                <img src={kost_terbaru} />
                <span>Kost Terbaru</span>
              </a>
            </div>
            <div className="col-sm-6  col-md-4 cards">
              <a href="#" className="card material-card-1">
                <img src={promo_event} />
                <span>Promo & Event</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HalamanPilihan;
