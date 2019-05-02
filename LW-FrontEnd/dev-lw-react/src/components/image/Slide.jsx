import React, { Component } from "react";

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
    // height: "500px",
    // width: "500px"
  };
  return <div className="slide" style={styles} />;
};

export default Slide;
