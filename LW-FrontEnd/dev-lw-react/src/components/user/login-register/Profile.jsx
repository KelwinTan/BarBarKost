import React, { Component } from "react";
import {
  getProfile,
  logoutUser,
  verifyUser,
  verifyPhone
} from "./UserFunctions";
import { Link, Redirect } from "react-router-dom";
import logo from "../../../assets/images/kota-besar/logo_mamikos_white.svg";
import defaultProfile from "../../../assets/images/Profile/user-avatar-main-picture.png";
import LoadingScreen from "../../utilities/LoadingScreen";

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
        <Link to="profile">Halaman Profile</Link>
      </li>
      <li>
        <a onClick={logoutUser}>Keluar</a>
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
      verifyPhone: false,
      email_verify_at: null,
      loadingScreen: false,
      phone_verify_at: null,
      phone: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  clickHam = () => {
    this.state.showMenu === false
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
    console.log(this.state.showMenu);
  };

  authenticateRedirection = () => {
    if (localStorage.getItem("usertoken") === null) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  componentDidMount() {
    if (localStorage.getItem("usertoken") === null) {
      console.log("Hello");
      return <Redirect to={"/"}> </Redirect>;
    } else {
      console.log("Hello1");
      getProfile().then(res => {
        console.log(res);
        this.setState({
          name: res.user.name,
          email: res.user.email,
          join: res.user.created_at,
          pictureID: res.user.picture_id,
          email_verify_at: res.user.email_verified_at,
          phone_verify_at: res.user.phone_verified_at,
          phone: res.user.phone
        });
      });
    }
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

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  UserEmailVerify = () => {
    if (this.state.email_verify_at === null) {
      const user = {
        email: this.state.email
      };
      verifyUser(user).then(res => {
        this.setState({ loadingScreen: true });
      });
    }
  };

  UserPhoneVerify = () => {
    if (this.state.phone_verify_at === null) {
      const user = {
        phone: this.state.phone
      };
      verifyPhone(user).then(res => {
        this.setState({ loadingScreen: true });
      });
    }
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
                    <Link to="/guest-update">Edit Profile</Link>
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
                <button
                  style={{
                    display: this.state.email_verify_at !== null ? "none" : ""
                  }}
                  onClick={this.UserEmailVerify}
                >
                  Verify
                </button>
              </div>
              <div className="profile-verify-status">
                {this.state.email_verify_at !== null ? (
                  <label>Verified</label>
                ) : (
                  <label>Belum Verified</label>
                )}
              </div>
              <div className="profile-func-btn">
                <label>Nomor Handphone</label>
                <button
                  onClick={this.UserPhoneVerify}
                  style={{
                    display: this.state.phone_verify_at !== null ? "none" : ""
                  }}
                >
                  Verify
                </button>
              </div>
              <div className="profile-verify-status">
                {this.state.phone_verify_at !== null ? (
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
                <Link to="update-phone">Update Phone Number</Link>
              </div>
              <div className="profile-functions-link">
                <Link to="verifikasi-akun">Verify Account</Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
