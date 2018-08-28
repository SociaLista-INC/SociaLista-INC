import React, { Component } from "react";
import axios from "axios";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: []
    };
  }
  componentDidMount() {
    this.getPosts();
    this.getSessions();
  }
  getPosts() {
    axios.get("/api/getposts").then(res => {
      this.setState({ posts: res.data });
    });
  }
  getSessions() {
    axios.get("/api/session").then(res => {
      console.log(res.data);
      this.setState({ user: res.data });
    });
  }

  handleDelete(id) {
    axios.delete(`api/post/${id}`).then(this.getPosts());
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
          <button onClick={() => this.handleDelete(e.post_id)}>Delete</button>
        </div>
      );
    });
    return <div>{mappedPosts}</div>;
  }
}

export default DashBoard;
