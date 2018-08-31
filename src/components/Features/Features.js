import React, { Component } from "react";
import FeaturesPicture from "../../FeaturesPicture.png";
import "./Features.css";

class Features extends Component {
  render() {
    return (
      <div id="Features-Background">
        <div id="features" className="features">
          <div
            className="center-align"
            style={{
              fontFamily: "Playfair Display",
              color: "#24101f",
              fontSize: "30px"
            }}
          >
            Features
          </div>
          <img id="Features-Picture" src={FeaturesPicture} alt="test" />
        </div>
      </div>
    );
  }
}

export default Features;
