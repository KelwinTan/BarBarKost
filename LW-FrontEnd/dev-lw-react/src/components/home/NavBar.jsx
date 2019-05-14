import React, { Component } from "react";
import "./Home.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import searchBtn from "../../assets/images/loupe.png";
import ModalBox from "../ModalBox";
import LoadingScreen from "../utilities/LoadingScreen";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIklan: false,
      color: "white",
      displaySearch: false,
      loadingScreen: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.showIklan = this.showIklan.bind(this);
    this.hideIklan = this.hideIklan.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.searchIklan = this.searchIklan.bind(this);
  }

  changeColor() {
    var newColor = this.state.color === "white" ? "black" : "white";
    this.setState({ color: newColor });
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
    if (this.state.displayIklan === false) {
      this.setState({ displayIklan: true });
    } else {
      this.setState({ displayIklan: false });
    }
  }

  searchIklan(event) {
    event.preventDefault();
    console.log(this.state.displaySearch);
    if (this.state.displaySearch === false) {
      this.setState({ displaySearch: true });
    } else {
      this.setState({ displaySearch: false });
    }
  }

  hideIklan() {
    this.setState({ displayIklan: false }, () => {
      document.removeEventListener("click", this.hideIklan);
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* {this.state.displaySearch === true ? <ModalBox /> : null} */}
        {this.state.loadingScreen === true ? <LoadingScreen /> : null}
        <div className="showcase-bed">
          <nav>
            <div className="navbar-header">
              <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo-image" />
                <Link to="/">BarBar Kost</Link>
              </div>
            </div>
            <div className="navbar-links">
              <a className="navbar-link-cari" onClick={this.searchIklan}>
                Cari Iklan
              </a>

              <Link to="/promosi-kost">Promosikan Iklan Anda</Link>
              <a onClick={this.showIklan}>Masuk</a>
              {this.state.displayIklan === true ? (
                <div className="masuk-menu">
                  <ul>
                    <li>
                      <Link to="/user-form">Sebagai Pencari </Link>
                    </li>
                    <li>
                      <Link to="/owner-form"> Sebagai Pemilik </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </nav>

          <div className="content-bg">
            <h1>Mau cari kos kosan?</h1>
            <p>
              Dapatkan info kost murah, kost harian, kost bebas, dan info kosan
              lainnya di BarBar Kost!
            </p>
          </div>
          <div className="search-kost">
            <div className="search-kost-label">
              <label>Pilih Lokasi</label>
            </div>
            <div className="search-kost-btn" onClick={this.searchIklan}>
              <img src={searchBtn} alt="Search" style={{ height: "28px" }} />
              <div className="search-kost-label1">
                <label>Cari nama tempat atau alamat</label>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
