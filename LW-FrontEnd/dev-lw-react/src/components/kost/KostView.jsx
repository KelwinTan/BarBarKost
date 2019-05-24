import React, { Component } from "react";
import { GetKost } from "./KostFunctions";

export class KostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kostName: "",
      kost: []
    };
  }

  componentDidMount() {
    GetKost().then(res => this.setState({ kost: res.data }));
  }
  render() {
    return (
      <div>
        {console.log(this.state.kost)}
        <div className="property-card">
          {this.state.kost.map(item =>
            item["id"] !== null ? (
              <a href="http://google.com" key={item}>
                <div className="card-kost">
                  <div className="card-kost-container">
                    <h4>Kost Name: {item["name"]}</h4>
                    <div className="card-kost-images">
                      <p>Address: {item["address"]}</p>
                      <p>{item["additional_fees"]}</p>
                      <p>City: {item["city"]}</p>
                      <p>Prices: {item["prices"]}</p>
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    );
  }
}

export default KostView;
