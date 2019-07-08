import React, { Component } from "react";
import MyLeaflet from "../map/MyLeaflet";
import { SearchApart } from "./PropertyFunctions";
import LoadingScreen from "../utilities/LoadingScreen";
import BreadCrumbs from "../utilities/BreadCrumbs";
import UserNav from "../user/navbar/UserNav";
import { Link, Redirect } from "react-router-dom";
import Footer from "../home/Footer";


export class SearchProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyList: [],
      lat: "",
      lng: "",
      loadingScreen: false
    };
  }

  handleAddress = (update, coordinates) => {
    // console.log(coordinates.lat);

    this.setState({
      address: update,
      lng: coordinates.lng,
      lat: coordinates.lat,
      loadingScreen: true
    });
    // console.log(this.state.lat);
    // console.log(this.state.lng);
    const apart = {
      lat: this.state.lat,
      lng: this.state.lng
    };
    SearchApart(apart).then(res => {
      // console.log(res);
      this.setState({ propertyList: res, loadingScreen: false });
    });
    console.log(this.state.propertyList);
  };

  componentDidUpdate() { }

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* <BreadCrumbs/> */}
        <UserNav />
        <h1 style={{ fontSize: "50px", textAlign: "center" }}>Search Property</h1>
        <div className="owner-dashboard-wrapper">
          <div className="owner-side-dashboard">
            <div className="owner-dashboard-contents hilang-padding">
              {/* <h1>Akun Pemilik: {this.state.name}</h1> */}
              <div style={{ margin: "auto" }}>
                <h1>Property Type</h1>
                <select
                  id="property-type"
                  name="propType"
                  onChange={this.handleChange}
                >
                  <option value="Kost">Kost</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              <div style={{ margin: "auto" }}>
                <h1>Kost Gender Type</h1>
                <select
                  id="kost-type"
                  name="kostType"
                  onChange={this.handleChange}
                >
                  <option value="Putri">Putri</option>
                  <option value="Putra">Putra</option>
                  <option value="Campur">Campur</option>
                </select>
              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              <div style={{ margin: "auto" }}>
                <h1>Jangka Waktu</h1>
                <select
                  id="jangka-waktu"
                  name="jangkaWaktu"
                  onChange={this.handleChange}
                >
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>

              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              {/* <img src={kost} alt="hello" style={{ height: "40px", width:"30px"}} /> */}
              <div style={{ margin: "auto" }}>
                <h1>Sorting By:</h1>
                <select
                  id="sort-by"
                  name="sortingBy"
                  onChange={this.handleChange}
                >
                  <option value="Murah">Termurah</option>
                  <option value="Mahal">Termahal</option>
                </select>

              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              <button>Set Filter</button>
            </div>
          </div>
          <div className="owner-side-dashboard-right">

            <div className="display-owner-buttons" style={{ alignItems: "center" }}>
              {/* <Link to="/input-kost">Insert Kosan</Link>
              <Link to="/input-apt">Insert Apartment</Link> */}
              <h1 style={{ fontSize: "50px" }}>Click Lokasinya</h1>

              <MyLeaflet updateAddr={this.handleAddress} />

            </div>
          </div>
        </div>
        <div style={{ margin: "0 auto" }}>

          {this.handleLoading()}
          {!this.state.loadingScreen
            ? console.log(this.state.propertyList)
            : null}
          <div className="property-card">
            {this.state.propertyList.map(item =>
              item["id"] !== null ? (
                <Link to={{
                  pathname: `/detail/kost-${item['kost_slug']}`,
                  state: {
                    kost_slug: item['kost_slug']
                  }
                }} key={item}>
                  <div className="card-kost">
                    <div className="card-kost-container">
                      <img src={`http://localhost:8000/storage/${item["banner_picture"]}`} alt="Banner" />
                      <h4>Kost Name: {item["name"]}</h4>
                      <div className="card-kost-images">
                        <p>Kost City: {item["city"]}</p>
                        <p>Kost Prices: {item["prices"]}</p>
                        <p>Kost Slug: {item["kost_slug"]}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                  ""
                )
            )}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default SearchProperty;
