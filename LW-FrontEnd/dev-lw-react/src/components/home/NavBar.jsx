import React, { Component } from "react";
import "./Home.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import searchBtn from "../../assets/images/loupe.png";
import ModalBox from "../ModalBox";
import LoadingScreen from "../utilities/LoadingScreen";
import { getProfile, logoutUser } from "../user/login-register/UserFunctions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIklan: false,
      color: "white",
      displaySearch: false,
      loadingScreen: false,
      showMenu: false,
      name: "",
      displayUserMenu: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.showIklan = this.showIklan.bind(this);
    this.hideIklan = this.hideIklan.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.searchIklan = this.searchIklan.bind(this);
    this.showUserMenu = this.showUserMenu.bind(this);
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

    if (localStorage.getItem("usertoken") !== null) {
      getProfile().then(res => {
        console.log(res);
        localStorage.setItem("usertype", res.user.type);
        this.setState({
          name: res.user.name,
          email: res.user.email,
          join: res.user.created_at,
          pictureID: res.user.picture_id,
          email_verify_at: res.user.email_verified_at
        });
      });
    }
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

  showUserMenu(event) {
    event.preventDefault();
    console.log(this.state.displayUserMenu);
    if (this.state.displayUserMenu === false) {
      this.setState({ displayUserMenu: true });
    } else {
      this.setState({ displayUserMenu: false });
    }
    // console.log("")
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

  clickHam = () => {
    this.state.showMenu === false
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
    console.log(this.state.showMenu);
  };

  GetUserData = () => {
    if (localStorage.getItem("usertoken") !== null) {
      getProfile().then(res => {
        // console.log(res);
        this.setState({
          name: res.user.name,
          email: res.user.email,
          join: res.user.created_at,
          pictureID: res.user.picture_id
        });
      });
    }
  };

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
              <div className="navbar-menu-toggle" onClick={this.clickHam}>
                <i className="fas fa-bars" aria-hidden="true" />
              </div>
            </div>
            <div
              className="navbar-links"
              style={{
                display: this.state.showMenu === true ? "block" : ""
              }}
            >
              <a className="navbar-link-cari" onClick={this.searchIklan}>
                Cari Iklan
              </a>

              <Link to="/promosi-kost">Promosikan Iklan Anda</Link>
              <a
                onClick={this.showIklan}
                style={{ display: this.state.name !== "" ? "none" : "" }}
              >
                Masuk
              </a>
              <a
                onClick={this.showUserMenu}
                style={{ display: this.state.name !== "" ? "" : "none" }}
              >
                {this.state.name}
              </a>
              {this.state.displayIklan === true ? (
                <div className="masuk-menu">
                  <ul>
                    <li>
                      <Link to="/user-form">Sebagai Pencari </Link>
                    </li>
                    <li>
                      <Link to="/owner-login"> Sebagai Pemilik </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
              {this.state.displayUserMenu === true ? (
                <div className="masuk-menu">
                  <ul>
                    <li>
                      <Link to="/profile">Halaman Profil</Link>
                    </li>
                    <li>
                      <a onClick={logoutUser}>Keluar</a>
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
