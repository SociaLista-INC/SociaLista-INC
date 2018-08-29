import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: {},
      content: "",
      createPostData: {},
      image_url: "",
      editing: false,
      contentEdit: "",
      postsLikes: []
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.createPost = this.createPost.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleContentEdit = this.handleContentEdit.bind(this);
    this.handleSendContentEdit = this.handleSendContentEdit.bind(this);
    this.handleLikePost = this.handleLikePost.bind(this);
    this.handleDeleteLikePost = this.handleDeleteLikePost.bind(this);
  }
  componentDidMount() {
    this.getPosts();
    this.getSessions();
    this.getPostsLikes();
  }
  getPosts() {
    axios.get("/api/getposts").then(res => {
      this.setState({ posts: res.data });
    });
  }
  getSessions() {
    axios.get("/api/session").then(res => {
      // console.log(res.data);
      this.setState({ user: res.data });
    });
  }

  handleDelete(id) {
    axios.delete(`api/post/${id}`).then(this.getPosts());
  }

  handleContentChange(content) {
    this.setState({ content });
  }

  handleImageUrlChange(image_url) {
    this.setState({ image_url });
  }

  handlePostClick() {
    let { content } = this.state;
    let { auth_id } = this.state.user;
    this.createPost(auth_id, content);
  }

  handleEditingPost() {
    this.setState({ editing: true });
  }

  handleContentEdit(contentEdit) {
    this.setState({ contentEdit });
  }

  handleSendContentEdit(post_id) {
    // console.log(post_id);
    this.setState({ editing: false });
    axios
      .put(`/api/post/${post_id}`, { content: this.state.contentEdit })
      .then(() => {
        this.getPosts();
        this.setState({ content: "" });
      })
      .catch(err => console.log(err));
  }

  createPost(auth_id, content) {
    axios
      .post(`/api/post/create`, { auth_id, content })
      .then(res => {
        // console.log(res.data[0]);
        this.setState({ createPostData: res.data[0] });
      })
      .then(() => {
        let { image_url } = this.state;
        let { post_id } = this.state.createPostData;

        axios.post(`/api/post/image/create`, { post_id, image_url });
      })
      .then(res => {
        this.getPosts();
        this.setState({ content: "", image_url: "" });
      })
      .catch(err => console.log(err));
  }

  handleLikePost(post_id) {
    let { auth_id } = this.state.user;
    let rate = 1;

    axios
      .post(`/api/post/like/${post_id}`, { auth_id, rate })
      .then(this.getPosts());
  }

  handleDeleteLikePost(post_id) {
    let { auth_id } = this.state.user;

    axios.delete(`/api/like/${post_id}/${auth_id}`).then(this.getPosts());
  }

  getPostsLikes() {
    axios.get("/api/getlikes").then(res => {
      this.setState({ postsLikes: res.data });
    });
  }

  render() {
    // console.log(this.state);

    let mappedPosts = this.state.posts.map((e, i) => {
      let {
        name,
        picture,
        content,
        post_id,
        likestotal,
        auth_id,
        image_url
      } = e;

      return (
        <div key={i}>
          <Link to={`/profile/${auth_id}`}>{name}</Link>

          <img alt="" src={picture} width="70px" />

          {!this.state.editing ? (
            <p onClick={e => this.handleEditingPost(e)}>{content}</p>
          ) : (
            <input
              onChange={e => this.handleContentEdit(e.target.value)}
              onBlur={() => this.handleSendContentEdit(post_id)}
            />
          )}
          <div>{likestotal}</div>
          <img alt="" src={image_url} width="70px" />
          <button onClick={() => this.handleLikePost(post_id)}>
            Like Post
          </button>
          <button onClick={() => this.handleDeleteLikePost(post_id)}>
            Dislike Post
          </button>
          <button onClick={() => this.handleDelete(post_id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <input
          onChange={e => this.handleContentChange(e.target.value)}
          type="text"
          value={this.state.content || ""}
          placeholder="Content of the Post"
          className="Content_InputBox_Dashboard"
        />
        <input
          className="ImageURL_InputBox_Dashboard"
          value={this.state.image_url || ""}
          placeholder="Image URL"
          onChange={e => this.handleImageUrlChange(e.target.value)}
        />
        <button
          type="post createbutton"
          onClick={() => this.handlePostClick()}
          className="Post_Button_Dashboard"
        >
          Post
        </button>
        {mappedPosts}
      </div>
    );
  }
}

export default DashBoard;
