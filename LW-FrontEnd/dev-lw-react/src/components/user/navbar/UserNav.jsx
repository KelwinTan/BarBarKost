import React, { Component } from "react";
import logo from "../../../assets/images/kota-besar/logo_mamikos_white.svg";
import { Link } from "react-router-dom";
import { getProfile, logoutUser } from "../login-register/UserFunctions";
import BreadCrumbs from "../../utilities/BreadCrumbs";
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";


const Iklan = (
  <div className="profile-iklan">
    <ul>
      <li>
        <Link to="/search-property">Cari Kost</Link>
      </li>
      <li>
        <Link to="/search-property">Cari Apartemen</Link>
      </li>
    </ul>
  </div>
);

const LogoutRedirect = () => {
  logoutUser().then(res => {
    this.props.history.push(`/`)
  }
  );
  //
}

const profileOptions = (
  <div className="profile-iklan lose-margin">
    <ul>
      <li>
        <Link to="/profile">Halaman Profile</Link>
      </li>
      <li>
        <a onClick={logoutUser}>Keluar</a>
      </li>
    </ul>
  </div>
);

export class UserNav extends Component {
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
      searchRes: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
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

  searchProperty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const fd = new FormData();
    fd.append('keyword', value);
    Axios.post('/api/search-property', fd).then(res => {
      console.log(res);
      this.setState({
        searchRes: res.data.data
      })
    })
    console.log(value);
  }

  clickHam = () => {
    this.state.showMenu === false
      ? this.setState({ showMenu: true })
      : this.setState({ showMenu: false });
    console.log(this.state.showMenu);
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
          <input type="text" placeholder="Cari Property" onChange={this.searchProperty} style={{ border: "none", background: "inherit", borderBottom: "2px solid white", color: "white" }} />

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
          {/* <div className="bread-crumbs">
            <Link to="/" className="active">
              Home
            </Link>
            <span>
              {" "}
              <i class="fas fa-greater-than" />{" "}
            </span>
            <span>User</span>
          </div> */}
          <BreadCrumbs />
          <hr />
          <div style={{ display: "flex", flexDirection: "row" }}>
            {
              this.state.searchRes === null ? "" :
                this.state.searchRes.map(item =>
                  item["id"] !== null ? (
                    <div>
                      <Link to={{
                        pathname: `/kost/detail-${item['kost_slug']}`,
                        state: {
                          apart_slug: item['kost_slug']
                        }
                      }} key={item}>
                        <div className="card-kost">
                          <div className="card-kost-container">
                            <h4>Property Name: {item["name"]}</h4>
                            <div className="card-kost-images">
                              <p>Kost City: {item["city"]}</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                    </div>
                  ) : (
                      ""
                    )
                )
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserNav);
