import React, { Component } from "react";
import { UserNav } from "../user/navbar/UserNav";
import { getProfile } from "../user/login-register/UserFunctions";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/images/kota-besar/logo_mamikos_white.svg";
import "./Owner.scss";
import Notification from "../../assets/images/owner/Notification.png";
import apt from "../../assets/images/owner/iklan_apt.png";
import kost from "../../assets/images/owner/iklan_kost.png";
import Axios from "axios";
import Footer from "../home/Footer";

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
        <Link to="cari-kost">Halaman Pemilik</Link>
      </li>
      <li>
        <Link to="cari-apartment">Keluar</Link>
      </li>
    </ul>
  </div>
);

export class OwnerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      join: "",
      type: 2,
      showIklan: false,
      showProfileFunc: false,
      showMenu: false,
      verifyEmail: false,
      verifyPhone: false,
      ownerId: null,
      totalKost: "",
      totalApt: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    this.authorizeUser();
    await getProfile().then(res => {
      console.log(res);
      this.setState({
        name: res.user.name,
        email: res.user.email,
        join: res.user.created_at,
        pictureID: res.user.picture_id,
        type: res.user.type,
        ownerId: res.user.id
      });
    });
    const fd = new FormData();
    fd.append('owner_id', this.state.ownerId);
    Axios.post("/api/ownerTotalKost", fd).then(res => {
      console.log(res);
      this.setState({
        totalKost: res.data

      })
    });
    Axios.post("/api/owner-total-apartment", fd).then(res => {
      console.log(res);
      this.setState({
        totalApt: res.data
      })
    });
    

  }

  authorizeUser = () => {
    if (this.state.type !== 2) {
      return <Redirect to={"/"}> </Redirect>;
    }
  };

  clickHam = () => {
    this.state.showMenu === false
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
    console.log(this.state.showMenu);
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className="profile-wrapper">
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
            <span>Halaman Pemilik</span>
          </div>
          <hr />
        </div> */}
        <UserNav />
        <div className="owner-dashboard-wrapper">
          <div className="owner-side-dashboard">
            <div className="owner-dashboard-contents">
              <h1>Akun Pemilik: {this.state.name}</h1>
              <div className="owner-dashboard-contents1">
                <Link to="/owner-update-profile">Update Profile</Link>
                <Link to="/profile">View Profile</Link>
              </div>
            </div>
            <div className="owner-dashboard-contents">
              <img src={Notification} alt="hello" style={{ height: "40px" }} />
              <h1>Notification</h1>
            </div>
            <div className="owner-dashboard-contents">
              <img src={apt} alt="hello" style={{ height: "40px" }} />
              <Link to="/data-apartment">Data Apartemen</Link>
            </div>
            <div className="owner-dashboard-contents">
              <img src={kost} alt="hello" style={{ height: "40px", width: "30px" }} />
              <Link to="/data-kost">Data Kost</Link>
            </div>
          </div>
          <div className="owner-side-dashboard-right">
            <div>Owner's Total Kost: {this.state.totalKost}</div>
            <div>Owner's Total Apartment: {this.state.totalApt}</div>

            <div className="display-owner-buttons">
              <Link to="/input-kost">Insert Kosan</Link>
              <Link to="/input-apt">Insert Apartment</Link>
              <Link to="/view-premium">View Premium Products</Link>
            </div>
          </div>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default OwnerDashboard;
