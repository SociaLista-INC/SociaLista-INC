import React, { Component } from "react";
// import FeaturesPictureTwo from "../../FeaturesPictureTwo.png";
import "./FeatureTwo.css";

class FeatureTwo extends Component {
  render() {
    return (
      <div id="FeatureTwo-Background">
        <div id="features" className="features">
          <h2 className="center-align">Features Two</h2>
          <div className="rows">
            <h5>Put mobile mockup here </h5>
          </div>
          {/* <img id="Features-Picture-Two" src={FeaturesPictureTwo} alt="test" /> */}
        </div>
      </div>
    );
  }
}

export default FeatureTwo;
