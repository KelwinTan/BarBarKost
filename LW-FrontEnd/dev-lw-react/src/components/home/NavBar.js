import React, { Component } from "react";
import "../../assets/Style.scss";
import logo from "../../assets/images/logo.png";
import CariIklan from ".././home/CariIklan";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    this.setState({ scroll: window.scrollY });
  }

  componentDidMount() {
    const navbar = document.querySelector("nav");
    this.setState({ top: navbar.offsetTop, height: navbar.offsetHeight });
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {
    this.state.scroll > this.state.top
      ? (document.querySelector("nav").style =
          "background-color:#17981a; transition: 0.5s ease-in;")
      : (document.querySelector("nav").style.backgroundColor =
          "rgba(0.1,0.1,0.1, 0.05)");
  }

  render() {
    return (
      <React.Fragment>
        <div className="showcase-bed">
          <nav>
            <div className="navbar-header">
              <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo-image" />
                <a href="/">BarBar Kost</a>
              </div>
            </div>
            <div className="navbar-links">
              {/* <div className="dropdown-cariKost"> */}
              {/* <a className="dropBtn" href="#">
                Cari Iklan
              </a>
              <div className="dropdown-links">
                <a href="#">Cari Kost</a>
                <a href="#">Cari Apartment</a>
              </div> */}
              <CariIklan className="dropdown-style" />
              {/* </div> */}
              <a href="#">Promosikan Iklan Anda</a>
              <a href="#">Masuk</a>
            </div>
          </nav>
          <div className="content-bg">
            <h1>Mau cari kos kosan?</h1>
            <p>
              Dapatkan info kost murah, kost harian, kost bebas, dan info kosan
              lainnya di BarBar Kost!
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
