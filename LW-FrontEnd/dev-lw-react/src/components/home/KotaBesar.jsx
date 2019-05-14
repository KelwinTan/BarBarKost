import React, { Component } from "react";
import kota_surabaya from "../../assets/images/kota-besar/kota_surabaya.png";
import kota_bali from "../../assets/images/kota-besar/kota_bali.png";
import kota_bandung from "../../assets/images/kota-besar/kota_bandung.png";
import kota_medan from "../../assets/images/kota-besar/kota_medan.png";
import kota_jabodetabek from "../../assets/images/kota-besar/kota_jabodetabek.png";
import kota_malang from "../../assets/images/kota-besar/kota_malang.png";
import kota_jogja from "../../assets/images/kota-besar/kota_jogjakarta.png";
import kota_makassar from "../../assets/images/kota-besar/kota_makassar.png";
import kota_semarang from "../../assets/images/kota-besar/kota_semarang.png";
import "./Home.scss";

class KotaBesar extends Component {
  render() {
    return (
      <div className="segment">
        <div className="title-group">
          <h3 className="as-title">
            <strong>KOTA BESAR</strong>
          </h3>
          <h4 className="as-subtitle">Temukan rumah kost di kota favoritmu</h4>
        </div>
        <div className="big-city">
          <div className="row">
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_jogja} />
                <span>JOGJAKARTA</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_malang} />
                <span>MALANG</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_makassar} />
                <span>MAKASSAR</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_jabodetabek} />
                <span>JABODETABEK</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_bali} />
                <span>BALI</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_semarang} />
                <span>SEMARANG</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_surabaya} />
                <span>SURABAYA</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_bandung} />
                <span>BANDUNG</span>
              </a>
            </div>
            <div className="col-sm-6 col-4 cards">
              <a href="/kota-besar" className="card material-card-1">
                <img alt="kota besar" src={kota_medan} />
                <span>MEDAN</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KotaBesar;
