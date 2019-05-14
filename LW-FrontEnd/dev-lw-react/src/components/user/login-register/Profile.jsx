import React, { Component } from "react";
import { getProfile } from "./UserFunctions";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/kota-besar/logo_mamikos_white.svg";
import defaultProfile from "../../../assets/images/Profile/user-avatar-main-picture.png";

const Iklan = (
  <div className="profile-iklan">
    <ul>
      <li>
        <Link to="cari-kost">Cari Kost</Link>
      </li>
      <li>
        <Link to="cari-apartment">Cari Apartemen</Link>
      </li>
    </ul>
  </div>
);

const profileOptions = (
  <div className="profile-iklan lose-margin">
    <ul>
      <li>
        <Link to="cari-kost">Halaman Profile</Link>
      </li>
      <li>
        <Link to="cari-apartment">Keluar</Link>
      </li>
    </ul>
  </div>
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      join: "",
      showIklan: false,
      showProfileFunc: false,
      showMenu: false,
      verifyEmail: false,
      verifyPhone: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  clickHam = () => {
    this.state.showMenu === false
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
    console.log(this.state.showMenu);
  };

  componentDidMount() {
    getProfile().then(res => {
      console.log(res);
      this.setState({
        name: res.user.name,
        email: res.user.email,
        join: res.user.created_at,
        pictureID: res.user.picture_id
      });
    });
  }

  iklanFunc = () => {
    this.state.showIklan === false
      ? this.setState({ showIklan: true })
      : this.setState({ showIklan: false });
  };

  profileFunc = () => {
    this.state.showProfileFunc === false
      ? this.setState({ showProfileFunc: true })
      : this.setState({ showProfileFunc: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="profile-wrapper">
          <div className="profile-logo">
            <a href="/">
              <img
                src={logo}
                alt="Barbar kost Logo"
                style={{ width: "125px", height: "25px" }}
              />
            </a>
          </div>
          <div
            className={
              this.state.showMenu === true
                ? "profile-functions active"
                : "profile-functions"
            }
          >
            <div className="profile-cari-iklan-btn" onClick={this.iklanFunc}>
              <span>
                Cari Iklan
                <i class="fas fa-caret-down" />
              </span>
              {this.state.showIklan === true ? Iklan : null}
            </div>
            <div className="profile-history">
              <Link to="/user-history">History</Link>
            </div>
            <div className="profile-cari-iklan-btn" onClick={this.profileFunc}>
              <span>
                {this.state.name}
                <i class="fas fa-caret-down" />
              </span>
              {this.state.showProfileFunc === true ? profileOptions : null}
            </div>
          </div>
          <div className="navbar-menu-toggle" onClick={this.clickHam}>
            <i className="fas fa-bars" aria-hidden="true" />
          </div>
        </div>
        <div className="profile-details">
          <div className="bread-crumbs">
            <Link to="/" className="active">
              Home
            </Link>
            <span>
              {" "}
              <i class="fas fa-greater-than" />{" "}
            </span>
            <span>User</span>
          </div>
          <hr />
          <div className="profile-wrap-all">
            <div className="profile-details-information-wrapper">
              <div className="profile-info-wrapper">
                <div className="profile-info-img">
                  <img src={defaultProfile} alt="" />
                </div>
                <div className="profile-info-edit">
                  <span>{this.state.name}</span>
                  <button>
                    <Link to="/update-profile">Edit Profile</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-info-wrapper1">
              <div className="profile-email-phone">
                <label>Email and Phone</label>
              </div>
              <hr />
              <div className="profile-func-btn">
                <label>Email</label>
                <button>Verify</button>
              </div>
              <div className="profile-verify-status">
                {this.state.verifyEmail === true ? (
                  <label>Verified</label>
                ) : (
                  <label>Belum Verified</label>
                )}
              </div>
              <div className="profile-func-btn">
                <label>Nomor Handphone</label>
                <button>Verify</button>
              </div>
              <div className="profile-verify-status">
                {this.state.verifyPhone === true ? (
                  <label>Verified</label>
                ) : (
                  <label>Belum Verified</label>
                )}
              </div>
            </div>

            <div className="profile-info-functions">
              <div className="profile-functions-link">
                <Link to="kost-saya">Kost Saya</Link>
              </div>
              <div className="profile-functions-link">
                <Link to="booking-kost">Booking</Link>
              </div>
              <div className="profile-functions-link">
                <Link to="verifikasi-identitas">Verify Identity</Link>
              </div>
              <div className="profile-functions-link">
                <Link to="verifikasi-akun">Verify Account</Link>
              </div>
            </div>
          </div>
          {/* <h1>Profile</h1>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Join Since</td>
                <td>{this.state.join}</td>
              </tr>
              <tr>
                <td>Picture ID</td>
                <td>{this.state.pictureID}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
