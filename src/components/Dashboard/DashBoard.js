import React, { Component } from "react";
import axios from "axios";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.getPosts();
  }
  getPosts() {
    axios.get("/api/getposts").then(res => {
      this.setState({ posts: res.data });
    });
  }

  render() {
    console.log(this.state.posts);
    let mappedPosts = this.state.posts.map((e, i) => {
      return (
        <div key={i}>
          <div>{e.name}</div>
          <img alt="" src={e.picture} width="70px" />
          <div>{e.content}</div>
          <img alt="" src={e.image_url} width="70px" />
        </div>
      );
    });
    return <div>{mappedPosts}</div>;
  }
}

export default DashBoard;
