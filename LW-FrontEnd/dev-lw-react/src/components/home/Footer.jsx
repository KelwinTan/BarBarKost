import React, { Component } from "react";
import telp from "../../assets/images/telp.png";
import email from "../../assets/images/email.png";
import twitter from "../../assets/images/twitter.png";
import facebook from "../../assets/images/facebook.png";
import insta from "../../assets/images/instagram.png";
import logo from "../../assets/images/kota-besar/logo_mamikos_green.svg";

export class Footer extends Component {
  render() {
    return (
      <div className="footer-page">
        <div className="footer-logo">
          <img
            src={logo}
            style={{ height: "39px", width: "240px" }}
            alt="logo"
          />
        </div>
        <div className="footer-text">
          <h3>Dapatkan "info kost murah" hanya di MamiKos App.</h3>
          <h3>Mau "Sewa Kost Murah"?</h3>
          <h3>Download BarBar Kos App Sekarang!</h3>
        </div>
        <div className="footer-link">
          <a href="/about-us">Tentang Kami</a>
          <span> | </span>
          <a href="/promosi-kost">Promosikan Kost Anda - GRATIS</a>
          <span> | </span>
          <a href="/data-privacy">Kebijakan Privasi</a>
          <span> | </span>
          <a href="/about-us">Tentang Kami</a>
        </div>
        <div className="footer-contact">
          <div className="footer-social">
            <a href="/twitter">
              <img src={twitter} alt="twitter" style={{ height: "35px" }} />
            </a>
            <a href="/facebook">
              <img src={facebook} alt="twitter" style={{ height: "35px" }} />
            </a>
            <a href="/insta">
              <img src={insta} alt="twitter" style={{ height: "35px" }} />
            </a>
          </div>
          <a href="https://google.com" style={{ paddingRight: "10px" }}>
            <img
              src={email}
              style={{ height: "16px", paddingRight: "1px" }}
              alt="Email"
            />
            barbar@kost.com
          </a>
          <a href="https://api.whatsapp.com/send?phone=6281387846543&text=&source=&data=">
            <img
              src={telp}
              alt="WA"
              style={{ height: "16px", paddingRight: "1px" }}
            />
            0813-8784-6543
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
