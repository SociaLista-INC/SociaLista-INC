import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import SimpleDialog from "../ListOfFollowers/ListOfFollowers";
import PostCard from "../PostCard/PostCard";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
      user: "",
      numOfFollowes: 0,
      isFollowing: [],
      followers: [],
      posts: []
    };
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
      this.setState({ user: res.data });
      // console.log(this.state.user.auth_id);
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
        // console.log(res);
        this.setState({ isFollowing: res.data });
      });
  }

  getCurrentUserPosts() {
    axios
      .get(`/api/getuserposts/${this.state.currentUser.auth_id}`)
      .then(res => this.setState({ posts: res.data }));
  }

  render() {
    // console.log(this.state.currentUser.auth_id);
    // console.log("number of followes", this.state.numOfFollowes);
    // console.log("check", this.state.isFollowing[0]);
    // console.log("THESE ARE THE POSTS", this.state.posts);
    // console.log("check", this.state.followers);
    return (
      <div>
        <div>{this.state.currentUser.name}</div>
        <img
          alt={this.state.currentUser.name}
          src={this.state.currentUser.picture}
          width="90px"
        />
        <Moment format="ll">{this.state.currentUser.time}</Moment>
        {this.state.user.auth_id ? (
          <div>
            {this.state.isFollowing[0] ? (
              <button onClick={() => this.handleUnFollow()}>Unfollow</button>
            ) : (
              <button onClick={() => this.handelFollow()}>Follow</button>
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
        />
      </div>
    );
  }
}

export default ProfilePage;
