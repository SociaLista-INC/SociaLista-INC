import React, { Component } from "react";
import MainLogo from "../../FeaturesPicture.png";

import "./Features.css";

class Features extends Component {
  render() {
    return (
      <div id="feature-container">
        <div id="features" className="features">
          <h2
            className="center-align"
            style={{ marginTop: "0px", marginBottom: "1px", paddingTop: "5vh" }}
          >
            Access on all of your devices
          </h2>

          <div className="FeaturesPic-Container">
            <img
              alt="logo"
              className="FeaturesPic"
              src={MainLogo}
              style={{ height: "400px", marginTop: "11vh" }}
            />
          </div>
          <div className="rows" />
        </div>
      </div>
    );
  }
}

export default Features;
