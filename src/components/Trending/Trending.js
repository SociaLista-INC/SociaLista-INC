import React, { Component } from "react";
import HashTagComponent from "../HashTags/HashTagComponent";
import News from "../News/News";
import "./Trending.css";

class Trending extends Component {
  render() {
    return (
      <div className="maing-trending">
        <h1 className="header-trending"> Trending</h1>
        <div className="trending-cards">
          <News />
          <HashTagComponent />
        </div>
      </div>
    );
  }
}

export default Trending;
