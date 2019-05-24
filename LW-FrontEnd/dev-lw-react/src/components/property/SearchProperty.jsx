import React, { Component } from "react";
import MyLeaflet from "../map/MyLeaflet";
import { SearchApart } from "./PropertyFunctions";
import LoadingScreen from "../utilities/LoadingScreen";

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
    // console.log(this.state.propertyList);
  };

  componentDidUpdate() {}

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
        <div style={{ margin: "0 auto" }}>
          <div className="input-data-lokasi">
            <h1>SEARCH PROPERTY</h1>
            <div className="input-data-form">
              <h1>Click Lokasinya</h1>
            </div>
            <MyLeaflet updateAddr={this.handleAddress} />
          </div>
          {this.handleLoading}
          {!this.state.loadingScreen
            ? console.log(this.state.propertyList)
            : null}
          <div className="property-card">
            {this.state.propertyList.map(item =>
              item["id"] !== null ? (
                <a href="http://google.com" key={item}>
                  <div className="card-kost">
                    <div className="card-kost-container">
                      <h4>Apart Name: {item["name"]}</h4>
                      <div className="card-kost-images">
                        <p>Apart Address: {item["address"]}</p>
                        <p>Aparty City: {item["city"]}</p>
                        <p>Apart Prices: {item["prices"]}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                ""
              )
            )}
            hello
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchProperty;
