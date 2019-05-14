import React, { Component } from "react";
import kost1 from "../../assets/images/kost1.jpg";
import ic_u_premium from "../../assets/images/kota-besar/ic_u_premium.svg";
import "./Home.scss";

class PropertyCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="property-card">
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
        </div>
      </React.Fragment>
    );
  }
}

export default PropertyCard;
