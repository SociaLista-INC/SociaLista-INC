import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
      user: ""
    };
  }
  componentDidMount() {
    this.getUserInfo();
    this.getSessions();
  }
  getUserInfo() {
    axios
      .get(`/api/getprofileinfo/${this.props.match.params.auth_id}`)
      .then(res => this.setState({ currentUser: res.data[0] }));
  }
  getSessions() {
    axios.get("/api/session").then(res => {
      this.setState({ user: res.data });
      console.log(this.state.user.auth_id);
    });
  }
  handelFollow() {
    axios.post(
      `/api/followuser/${this.state.currentUser.auth_id}/${
        this.state.user.auth_id
      }`
    );
  }

  render() {
    // console.log(this.state.currentUser.auth_id);
    return (
      <div>
        <div>{this.state.currentUser.name}</div>
        <img src={this.state.currentUser.picture} width="90px" />
        <Moment format="ll">{this.state.currentUser.time}</Moment>
        {this.state.user.auth_id ? (
          <button onClick={() => this.handelFollow()}>Follow</button>
        ) : (
          "please login"
        )}
      </div>
    );
  }
}

export default ProfilePage;
