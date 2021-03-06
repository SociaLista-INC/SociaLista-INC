import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import PostCreate from "./PostCreate";
import Stories from "../Stories/Stories";
import Loading from "react-loading-components";
import News from "../News/News";
import HashTagComponent from "../HashTags/HashTagComponent";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: {},
      content: "",
      createPostData: {},
      image_url: "",
      contentEdit: "",
      postsLikes: [],
      media: "",
      file: null,
      loading: true,
      isloading: true
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
    this.getPosts = this.getPosts.bind(this);
    this.getSessions = this.getSessions.bind(this);
    this.createPost = this.createPost.bind(this);
    this.getPostsLikes = this.getPostsLikes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handelUrlText = this.handelUrlText.bind(this);
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
      this.setState({ user: res.data, loading: false });
    });
  }

  handleDelete(id) {
    axios.delete(`api/post/${id}`).then(() => this.getPosts());
  }

  handleContentChange(content) {
    this.setState({ content });
  }

  handelUrlText(image_url) {
    this.setState({ image_url });
  }

  handleFileUpload = event => {
    // console.log(event.target.files);
    this.setState({ file: event.target.files });
  };

  handleImageUrlChange = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post(`/api/post-upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        this.setState({
          image_url: res.data.Location
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePostClick() {
    let { content } = this.state;
    let { auth_id } = this.state.user;
    this.createPost(auth_id, content);
  }

  handleContentEdit(contentEdit) {
    this.setState({ contentEdit });
  }

  handleSendContentEdit(post_id) {
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

    axios.post(`/api/post/like/${post_id}`, { auth_id, rate }).then(res => {
      this.getPosts();
    });
  }

  handleDeleteLikePost(post_id) {
    let { auth_id } = this.state.user;

    axios.delete(`/api/like/${post_id}/${auth_id}`).then(res => {
      this.getPosts();
    });
  }

  getPostsLikes() {
    axios.get("/api/getlikes").then(res => {
      this.setState({ postsLikes: res.data, isloading: false });
    });
  }

  render() {
    // console.log(this.state);

    let mappedPosts = this.state.posts.map((e, i) => {
      return (
        <div key={i}>
          <Post
            e={e}
            getPosts={this.getPosts}
            handleContentEdit={this.handleContentEdit}
            handleSendContentEdit={this.handleSendContentEdit}
            handleDelete={this.handleDelete}
            currentUser={this.state.user}
            handleLikePost={this.handleLikePost}
            handleDeleteLikePost={this.handleDeleteLikePost}
          />
        </div>
      );
    });
    if (this.state.loading) {
      return null;
    }
    return (
      <div className="main-background-dashboard">
        <Stories currentUser={this.state.user} />
        <PostCreate
          handelUrlText={this.handelUrlText}
          file={this.state.file}
          handleFileUpload={this.handleFileUpload}
          handleContentChange={this.handleContentChange}
          handleImageUrlChange={this.handleImageUrlChange}
          handlePostClick={this.handlePostClick}
        />
        <div className="list-posts-postCard">
          <div className="dashboard-hash">
            <HashTagComponent />
          </div>
          <div className="dashboard-posts">
            {this.state.isloading ? (
              <Loading type="puff" width={100} height={100} fill="#f44242" />
            ) : (
              mappedPosts
            )}
          </div>
          <div>
            <News />
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
