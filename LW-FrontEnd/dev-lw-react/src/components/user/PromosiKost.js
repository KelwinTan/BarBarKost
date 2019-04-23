import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/Style.scss";
import pengguna from "../../assets/images/slider/icons/Group.svg";
import kost from "../../assets/images/slider/icons/Apart.svg";

export class PromosiKost extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="promosi-kost">
          <div className="navbar-header">
            <div className="navbar-logo">
              <img src={logo} alt="Logo" className="logo-image" />
              <a href="/" style={{ color: "#228B22" }}>
                BarBar Kost
              </a>
            </div>
            <div className="navbar-links">
              <a href="/fasilitas" style={{ color: "black" }}>
                Fasilitas
              </a>
              <a href="/testimoni" style={{ color: "black" }}>
                Testimoni
              </a>
            </div>
            <div className="promosi-kost-content">
              <h1>Tak sampai satu minggu, langsung penuh bosqu!</h1>
              <p>
                <strong>Upgrade ke Premium</strong> dan dapatkan fitur-fitur
                terbaik.
              </p>
              <p>Buat iklan kostmu lebih menarik bagi calon penyewa.</p>
            </div>
            <div className="upgrade-premium">
              <button type="submit">Upgrade Premium</button>
              <button type="submit">Pelajari lebih lanjut</button>
            </div>
            <div className="promosi-kost-content-video">
              <iframe
                src="http://www.youtube.com/embed/MvPu1fsyPus"
                width={"560"}
                height={315}
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <div className="promosi-kost-content2">
              <h1>Kenapa promosi kost di BarBar Kost?</h1>
              <div className="promosi-kost-content2-image">
                <div className="promosi-kost-content2-isi">
                  <figure>
                    <div
                      // style={{ height: "200px" }}
                      className="image"
                    />
                  </figure>
                  <p className="title">3.400.000+</p>
                  <p className="sub-title">
                    Pengguna aktif BarBar Kost yang terdaftar
                  </p>
                </div>

                <div className="promosi-kost-content2-isi">
                  <figure>
                    <div
                      // style={{ height: "200px" }}
                      className="image2"
                    />
                  </figure>
                  <p className="title">300.000+</p>
                  <p className="sub-title">
                    Kost aktif yang terdaftar dan terverifikasi
                  </p>
                </div>

                <div className="promosi-kost-content2-isi">
                  <figure>
                    <div
                      // style={{ height: "200px" }}
                      className="image3"
                    />
                  </figure>
                  <p className="title">105.000+</p>
                  <p className="sub-title">
                    Pengguna mengunjungi Mamikos setiap hari
                  </p>
                </div>

                <div className="promosi-kost-content2-isi">
                  <figure>
                    <div
                      // style={{ height: "200px" }}
                      className="image4"
                    />
                  </figure>
                  <p className="title">30.000+</p>
                  <p className="sub-title">
                    Pengguna menghubungi kost lewat Mamikos setiap hari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PromosiKost;
