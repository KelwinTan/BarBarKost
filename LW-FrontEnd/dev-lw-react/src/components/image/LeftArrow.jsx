import React, { Component } from "react";

const LeftArrow = props => {
  return (
    <div className="image-left-arrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
    </div>
  );
};

export default LeftArrow;
