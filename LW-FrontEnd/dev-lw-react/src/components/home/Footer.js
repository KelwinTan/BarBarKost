import React, { Component } from "react";
import image from "../../assets/images/footer-slide.png";
import telp from "../../assets/images/telp.png";
import email from "../../assets/images/email.png";
import twitter from "../../assets/images/twitter.png";
import facebook from "../../assets/images/facebook.png";
import insta from "../../assets/images/instagram.png";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img src={image} alt="Kost" style={{ width: "100%" }} />
        <div className="footer-contact">
          <div className="footer-social">
            <a href="#twitter">
              <img src={twitter} alt="twitter" style={{ height: "35px" }} />
            </a>
            <a href="#facebook">
              <img src={facebook} alt="twitter" style={{ height: "35px" }} />
            </a>
            <a href="#insta">
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
