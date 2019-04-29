import React, { Component } from "react";
import "../../assets/Style.scss";
import logo from "../../assets/images/logo.png";
import CariIklan from ".././home/CariIklan";
import { UserForm } from "../user/UserForm";
import { Home } from "./Home";
import { Link } from "react-router-dom";
import App from "../../App";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIklan: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.showIklan = this.showIklan.bind(this);
    this.hideIklan = this.hideIklan.bind(this);
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
          "background-color:#17981a; transition: 0.5s ease-in; z-index:10;")
      : (document.querySelector("nav").style.backgroundColor =
          "rgba(0.1,0.1,0.1, 0.05)");
  }

  showIklan(event) {
    event.preventDefault();
    console.log(this.state.displayIklan);
    if (this.state.displayIklan == false) {
      this.setState({ displayIklan: true });
    } else {
      this.setState({ displayIklan: false });
    }
    // this.setState({ displayIklan: true }, () => {
    //   document.addEventListener("click", this.hideIklan);
    // });
  }

  hideIklan() {
    this.setState({ displayIklan: false }, () => {
      document.removeEventListener("click", this.hideIklan);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="showcase-bed">
          <nav>
            <div className="navbar-header">
              <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo-image" />
                <Link to="/">BarBar Kost</Link>
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
              <Link to="/promosi-kost">Promosikan Iklan Anda</Link>
              {/* <div className="masuk-menu">
                <ul>
                  <li>
                    <Link to="/userForm">Sebagai Pencari </Link>
                  </li>
                  <li>
                    <Link to="#"> Sebagai Pemilik </Link>
                  </li>
                </ul>
              </div> */}
              {this.state.displayIklan == true ? (
                <div className="masuk-menu">
                  <ul>
                    <li>
                      <Link to="/userForm">Sebagai Pencari </Link>
                    </li>
                    <li>
                      <Link to="#"> Sebagai Pemilik </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
              <button onClick={this.showIklan}>Masuk</button>
              {/* <div className="nav-content">
                <div className="nav-sub">
                  <ul>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Do you really care what is here?</a>
                    </li>
                    <li>
                      <a href="#">Of course you do !</a>
                    </li>
                  </ul>
                </div>
              </div> */}

              {/* <Link to="/userForm">Masuk</Link> */}
            </div>
          </nav>
          <div className="content-bg">
            <h1>Mau cari kos kosan?</h1>
            <p>
              Dapatkan info kost murah, kost harian, kost bebas, dan info kosan
              lainnya di BarBar Kost!
            </p>
            {/* <div className="search-kost">
              <form className="search-kost-box">
                <div></div>

              </form>
            </div> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
