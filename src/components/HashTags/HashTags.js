import React, { Component } from "react";
import "./HashTags.css";
import axios from "axios";

class HashTags extends Component {
  constructor() {
    super();
    this.state = {
      HashTags: []
    };
  }

  componentDidMount() {
    axios.get("/api/hashtags").then(res => {
      console.log(res);
      this.setState({ HashTags: res.data });
    });
  }

  render() {
    console.log(this.state.HashTags);
    let mappedHashTags = this.state.HashTags.map((e, i) => {
      return (
        <div key={i}>
          <div>#{e.tag}</div>
        </div>
      );
    });
    return (
      <div className="container2">
        <div className="container1">{mappedHashTags}</div>
      </div>
    );
  }
}

export default HashTags;
