import React from "react";
import PropTypes from "prop-types";

const Card = ({ property }) => {
  const {
    index,
    picture,
    city,
    address,
    bedrooms,
    bathrooms,
    carSpaces
  } = property;
  return (
    <div id={`card-${index}`} className="card">
      <img src={picture} alt={city} />
      <div className="details">
        <span className="index">{index + 1}</span>
        <p className="location">
          {city}
          <br />
          {address}
        </p>
        <ul className="features">
          <li className="icon-bed">
            {bedrooms}
            <span>Bedrooms</span>
          </li>
          <li className="icon-bath">
            {bathrooms}
            <span>Bathrooms</span>
          </li>
          <li className="icon-car">
            {carSpaces}
            <span>Parking Spots</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
