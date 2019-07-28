import React, { Component } from "react";
import MyLeaflet from "../map/MyLeaflet";
import { SearchApart } from "./PropertyFunctions";
import LoadingScreen from "../utilities/LoadingScreen";
import BreadCrumbs from "../utilities/BreadCrumbs";
import UserNav from "../user/navbar/UserNav";
import { Link, Redirect, withRouter } from "react-router-dom";
import Footer from "../home/Footer";
import Axios from "axios";
import LoadingInfinite from "../user/profile/LoadingInfinite";


export const getObjectFromQueryParams = (params, keys) => {
  const query = new URLSearchParams(params)
  let object = {}
  for (const key of keys) {
    if (query.get(key))
      object[key] = query.get(key)
  }

  return isEmptyObject(object) ? null : object
}
export const objectToQueryParams = obj => {
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&")
}

export const getObjectFromQueryParamsExcept = (params, keys) => {
  const query = new URLSearchParams(params)
  let object = {}
  for (const key of query.entries()) {
    if (!keys.includes(key[0]))
      object[key[0]] = key[1]
  }

  return isEmptyObject(object) ? null : object
}
export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0
}


export class SearchProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyList: [],
      lat: "",
      lng: "",
      loadingScreen: true,
      propertyType: "Apartment",
      gender: "",
      floors: "",
      priceType: "",
      paginateData: null,
      getLink: "/api/search-property-area",
      infinite: false,

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

    const fd = new FormData();
    fd.append("lat", this.state.lat);
    fd.append("lng", this.state.lng);
    fd.append("gender", this.state.gender);
    fd.append("type", this.state.propertyType);
    fd.append("floors", this.state.floors);
    fd.append("priceType", this.state.priceType);
    var pages = this.props.history.location.search;

    Axios.post(`${this.state.getLink + pages}`, fd).then(res => {
      console.log(res);
      this.setState({
        propertyList: res.data.data,
        loadingScreen: false,
        paginateData: res.data

      });
    }
    );

    // SearchApart(apart).then(res => {
    //   // console.log(res);
    //   this.setState({ propertyList: res, loadingScreen: false });
    // });
    console.log(this.state.propertyList);
  };

  componentWillReceiveProps(next_props, next_state) {
    this.setState({
      loadingScreen: true
    })
    console.log(next_props);
    const fd = new FormData();
    fd.append("lat", this.state.lat);
    fd.append("lng", this.state.lng);
    fd.append("gender", this.state.gender);
    fd.append("type", this.state.propertyType);
    fd.append("floors", this.state.floors);
    fd.append("priceType", this.state.priceType);
    Axios.post(`${this.state.getLink + next_props.location.search}`, fd).then(res => {
      console.log(res);
      this.setState({
        propertyList: [...this.state.propertyList, ...res.data.data],
        loadingScreen: false,
        paginateData: res.data,

      });
    }
    );
  }


  componentDidUpdate() { }

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  filterSearch = () => {
    this.setState({ loadingScreen: true });
    const fd = new FormData();
    fd.append("lat", this.state.lat);
    fd.append("lng", this.state.lng);
    fd.append("gender", this.state.gender);
    fd.append("type", this.state.propertyType);
    fd.append("floors", this.state.floors);
    fd.append("priceType", this.state.priceType);

    Axios.post("/api/search-property-area", fd).then(res => {
      console.log(res);
      this.setState({
        propertyList: res.data.data,
        loadingScreen: false,
        paginateData: res.data

      });
    }
    );
  }

  componentWillMount = () => {
    window.onscroll = () => {

      if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
        if (!this.state.infinite) {

          this.setState({ infinite: true }, () => {
            console.log("Hello0");
            let query = getObjectFromQueryParamsExcept(this.props.location.search, [
              "page"
            ]);
            if (query === null) query = { page: 2 };
            else query.page = parseInt(query.page) + 1;
            const fd = new FormData();
            fd.append('user_id', this.state.id);
            const url = this.props.match.url + "?" + objectToQueryParams(query);
            console.log(`${this.state.getLink}/${query.page}`)
            Axios.post(`${this.state.getLink}?page=${query.page}`, fd).then(res => {
              // console.log(res);
              this.setState({
                propertyList: [...this.state.propertyList, ...res.data.data],
                infinite: false,
                paginateData: res.data,

              });
            });
          });

        }
      }
    };
  }

  handleInfinite = () => {
    if (this.state.infinite === true) {
        return <LoadingInfinite />;
    } else {
        return null;
    }
}


  handlePropertyType = (event) => {
    const { name, value } = event.target;
    this.setState({ propertyType: value });
    console.log(this.state);
  }

  handleGender = (event) => {
    const { name, value } = event.target;
    this.setState({ gender: value });
    console.log(this.state);
  }

  handleFloor = (event) => {
    const { name, value } = event.target;
    this.setState({ floors: value });
    console.log(this.state);
  }

  handleLoading = () => {
    if (this.state.loadingScreen === true) {
      return <LoadingScreen />;
    } else {
      return null;
    }
  };

  handlePrice = (event) => {
    const { name, value } = event.target;
    this.setState({ priceType: value });
    console.log(this.state);
  }

  componentDidMount() {
    this.setState({ loadingScreen: false });
  }

  render() {
    return (
      <React.Fragment>
        {/* <BreadCrumbs/> */}
        <UserNav />
        {this.handleLoading()}

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
                  onChange={this.handlePropertyType}
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
                  onChange={this.handleGender}
                >
                  <option value="Putri">Putri</option>
                  <option value="Putra">Putra</option>
                  <option value="Campur">Campur</option>
                </select>
              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              <div style={{ margin: "auto" }}>
                <h1>Unit Floor</h1>
                <input type="number" placeholder="Input Unit Floors" onChange={this.handleFloor} />

              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              {/* <img src={kost} alt="hello" style={{ height: "40px", width:"30px"}} /> */}
              <div style={{ margin: "auto" }}>
                <h1>Sorting By:</h1>
                <select
                  id="sort-by"
                  name="sortingBy"
                  onChange={this.handlePrice}
                >
                  <option value="Murah">Termurah</option>
                  <option value="Mahal">Termahal</option>
                </select>

              </div>
            </div>
            <div className="owner-dashboard-contents hilang-padding">
              <button onClick={this.filterSearch}>Set Filter</button>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="post-cards">
              {this.state.propertyList.map(item =>
                item["id"] !== null ? (
                  <Link to={{
                    pathname: `/detail/kost-${item['kost_slug']}`,
                    state: {
                      kost_slug: item['kost_slug']
                    }
                  }} key={item["id"]}>
                    <div className="card-kost post-resp" style={{ height: "400px", width: "300px" }}>
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
        </div>
        {this.handleInfinite()}

        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(SearchProperty);
