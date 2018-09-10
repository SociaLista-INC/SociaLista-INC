import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import SimpleDialog from "../ListOfFollowers/ListOfFollowers";
import PostCard from "../PostCard/PostCard";
import Button from "@material-ui/core/Button";
import "./ProfilePage.css";
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
      user: "",
      numOfFollowes: 0,
      isFollowing: [],
      followers: [],
      posts: [],
      loading: true
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleLikePost = this.handleLikePost.bind(this);
    this.handleDeleteLikePost = this.handleDeleteLikePost.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getSessions = this.getSessions.bind(this);
    this.getNumOfFollowes = this.getNumOfFollowes.bind(this);
    this.getAllFollowers = this.getAllFollowers.bind(this);
    this.handelFollow = this.handelFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
    this.checkIfFollowing = this.checkIfFollowing.bind(this);
    this.getCurrentUserPosts = this.getCurrentUserPosts.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getSessions();
  }

  async getUserInfo() {
    await axios
      .get(`/api/getprofileinfo/${this.props.match.params.auth_id}`)
      .then(res => this.setState({ currentUser: res.data[0] }))
      .then(() => this.getCurrentUserPosts())
      .then(() => this.getNumOfFollowes())
      .then(() => this.checkIfFollowing())
      .then(() => this.getAllFollowers());
  }

  getNumOfFollowes() {
    axios
      .get(`/api/numoffollowers/${this.state.currentUser.auth_id}`)
      .then(res => this.setState({ numOfFollowes: res.data[0].count }));
  }

  getAllFollowers() {
    axios
      .get(`/api/getlistoffollowers/${this.state.currentUser.auth_id}`)
      .then(res => this.setState({ followers: res.data }));
  }

  getSessions() {
    axios.get("/api/session").then(res => {
      this.setState({ user: res.data, loading: false });
    });
  }

  handelFollow() {
    axios
      .post(
        `/api/followuser/${this.state.currentUser.auth_id}/${
          this.state.user.auth_id
        }`
      )
      .then(() => this.getNumOfFollowes())
      .then(() => this.checkIfFollowing());
  }

  handleUnFollow() {
    axios
      .delete(
        `/api/unfollowuser/${this.state.currentUser.auth_id}/${
          this.state.user.auth_id
        }`
      )
      .then(() => this.getNumOfFollowes())
      .then(() => this.checkIfFollowing());
  }

  checkIfFollowing() {
    axios
      .get(
        `/api/getfollowinginfo/${this.state.currentUser.auth_id}/${
          this.state.user.auth_id
        }`
      )
      .then(res => {
        this.setState({ isFollowing: res.data });
      });
  }

  getCurrentUserPosts() {
    axios
      .get(`/api/getuserposts/${this.state.currentUser.auth_id}`)
      .then(res => this.setState({ posts: res.data }));
  }

  handleDelete(id) {
    axios.delete(`api/post/${id}`).then(() => this.getCurrentUserPosts());
  }

  handleLikePost(post_id) {
    let { auth_id } = this.state.user;
    let rate = 1;

    axios
      .post(`/api/post/like/${post_id}`, { auth_id, rate })
      .then(() => this.getCurrentUserPosts());
  }

  handleDeleteLikePost(post_id) {
    let { auth_id } = this.state.user;

    axios
      .delete(`/api/like/${post_id}/${auth_id}`)
      .then(() => this.getCurrentUserPosts());
  }

  render() {
    // console.log(this.state.currentUser.auth_id);
    // console.log("number of followes", this.state.numOfFollowes);
    // console.log("check", this.state.isFollowing[0]);
    // console.log("THESE ARE THE POSTS", this.state.posts);
    // console.log("check", this.state.followers);

    if (this.state.loading) {
      return null;
    }

    return (
      <div className="user-main-profile">
        <div className="user-main-name">{this.state.currentUser.name}</div>
        <img
          alt={this.state.currentUser.name}
          src={this.state.currentUser.picture}
          width="90px"
        />
        <Moment format="ll">{this.state.currentUser.time}</Moment>
        {this.state.user.auth_id ? (
          <div>
            {this.state.isFollowing[0] ? (
              <Button onClick={() => this.handleUnFollow()}>Unfollow</Button>
            ) : (
              <Button onClick={() => this.handelFollow()}>Follow</Button>
            )}
          </div>
        ) : (
          "please login"
        )}
        <div>
          Followers
          {this.state.numOfFollowes}
        </div>
        <SimpleDialog followers={this.state.followers} />
        <br />
        <PostCard
          getUserInfo={this.getUserInfo}
          user={this.state.user}
          posts={this.state.posts}
          currentUser={this.state.currentUser}
          handleDelete={this.handleDelete}
          handleLikePost={this.handleLikePost}
          handleDeleteLikePost={this.handleDeleteLikePost}
        />
      </div>
    );
  }
}

export default ProfilePage;
