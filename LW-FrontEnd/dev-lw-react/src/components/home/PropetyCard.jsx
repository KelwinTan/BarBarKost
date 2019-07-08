import React, { Component } from "react";
import kost1 from "../../assets/images/kost1.jpg";
import ic_u_premium from "../../assets/images/kota-besar/ic_u_premium.svg";
import "./Home.scss";
import axios from "axios";
import { getProfile } from "../user/login-register/UserFunctions";
import { Link } from "react-router-dom";
import { runInThisContext } from "vm";

class PropertyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      join: "",
      type: 1,
      showIklan: false,
      showProfileFunc: false,
      showMenu: false,
      verifyEmail: false,
      verifyPhone: false,
      totalUsers: 0,
      loadingScreen: true,
      kostList: "",
      apartList: "",
      paginateData: null,
      id: "",
      lat: "",
      lng: "",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  setPosition = (position) => {
    console.log(position);
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setPosition(position)
      },
        () => this.setPosition([-0.0900000, 51.5050000]));
    } else {
      alert("Browser cannot support Geolocation");
    }
    // await getProfile().then(res => {
    //   console.log(res);
    //   this.setState({
    //     name: res.user.name,
    //     email: res.user.email,
    //     join: res.user.created_at,
    //     pictureID: res.user.picture_id,
    //     type: res.user.type,
    //     id: res.user.id
    //   });
    // });

    console.log(this.state.lat);
    console.log(this.state.lng);
    const fd = new FormData();
    fd.append("lat", this.state.lat);
    fd.append("lng", this.state.lng);

    await axios.post("/api/top-4-kosts", fd).then(res => {
      console.log(res.data);
      this.setState({
        kostList: res.data,
      });
    }
    );

    await axios.post("/api/top-4-apart", fd).then(res => {
      console.log(res.data);
      this.setState({
        apartList: res.data,
        loadingScreen: false,
      });
    }
    );
  }
  render() {
    return (
      <React.Fragment>
        {/* <div className="property-card">
          <a href="http://google.com">
            <div className="card-kost">
              <img src={kost1} alt="kost 1" />
              <div className="card-kost-container">
                <h4>Putri + Pancoran Mas, Depok, Depok</h4>
                <p>Rp 900.000 / bulan + Ada 8 Kamar</p>
                <p>KOSAN DA BEST</p>
                <div className="card-kost-images">
                  <img
                    src={ic_u_premium}
                    alt=""
                    style={{ height: "12px", width: "12px" }}
                  />
                </div>
              </div>
            </div>
          </a>
          <a href="http://google.com">
            <div className="card-kost">
              <img src={kost1} alt="kost 1" />
              <div className="card-kost-container">
                <h4>Putri + Pancoran Mas, Depok, Depok</h4>
                <p>Rp 900.000 / bulan + Ada 8 Kamar</p>
                <p>KOSAN DA BEST</p>
                <div className="card-kost-images">
                  <img
                    src={ic_u_premium}
                    alt=""
                    style={{ height: "12px", width: "12px" }}
                  />
                </div>
              </div>
            </div>
          </a>
          <a href="http://google.com">
            <div className="card-kost">
              <img src={kost1} alt="kost 1" />
              <div className="card-kost-container">
                <h4>Putri + Pancoran Mas, Depok, Depok</h4>
                <p>Rp 900.000 / bulan + Ada 8 Kamar</p>
                <p>KOSAN DA BEST</p>
                <div className="card-kost-images">
                  <img
                    src={ic_u_premium}
                    alt=""
                    style={{ height: "12px", width: "12px" }}
                  />
                </div>
              </div>
            </div>
          </a>
          <a href="http://google.com">
            <div className="card-kost">
              <img src={kost1} alt="kost 1" />
              <div className="card-kost-container">
                <h4>Putri + Pancoran Mas, Depok, Depok</h4>
                <p>Rp 900.000 / bulan + Ada 8 Kamar</p>
                <p>KOSAN DA BEST</p>
                <div className="card-kost-images">
                  <img
                    src={ic_u_premium}
                    alt=""
                    style={{ height: "12px", width: "12px" }}
                  />
                </div>
              </div>
            </div>
          </a>
        </div> */}
        <div style={{ padding: "40px", margin: "auto" }}>

          {!this.state.loadingScreen
            ?
            <div className="property-card property-responsive property-props" >
              {this.state.kostList.map(item =>
                item["id"] !== null ? (
                  <Link to={{
                    pathname: `/kost/detail-${item["properties"]['kost_slug']}`,
                    state: {
                      apart_slug: item["properties"]['kost_slug']
                    }
                  }} key={item["id"]}>
                    <div className="card-kost" style={{ width: "300px", height: "500px" }}>
                      <div className="card-kost-container">
                        <img src={`http://localhost:8000/storage/${item["properties"]["banner_picture"]}`} alt="Banner" />
                        <h4>Kost Name: {item["properties"]["name"]}</h4>
                        <div className="card-kost-images">
                          <p>Kost Address: {item["properties"]["address"]}</p>
                          <p>Kost City: {item["properties"]["city"]}</p>
                          <p>Kost Prices: {item["properties"]["prices"]}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                    ""
                  )
              )}
            </div>
            : null}
          {!this.state.loadingScreen
            ?
            <div className="property-card property-responsive property-props">
              {this.state.apartList.map(item =>
                item["id"] !== null ? (
                  <Link to={{
                    pathname: `/apart/detail-${item["apartments"]['slug']}`,
                    state: {
                      apart_slug: item["apartments"]['slug']
                    }
                  }} key={item}>
                    <div className="card-kost" style={{ width: "300px", height: "500px" }}>
                      <div className="card-kost-container">
                        <img src={`http://localhost:8000/storage/${item["apartments"]["banner_picture"]}`} alt="Banner" />
                        <h4>Apartment Name: {item["apartments"]["name"]}</h4>
                        <div className="card-kost-images">
                          <p>Apartment Address: {item["apartments"]["address"]}</p>
                          <p>Apartment City: {item["apartments"]["city"]}</p>
                          <p>Apartment Prices: {item["apartments"]["prices"]}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                    ""
                  )
              )}
            </div>
            : null}
        </div>
      </React.Fragment>
    );
  }
}

export default PropertyCard;
