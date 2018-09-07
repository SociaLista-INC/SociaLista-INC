// import React, { Component } from "react";
// import axios from "axios";
// import SimpleDialog from "../ListOfFollowers/ListOfFollowers";

// class DashboardFriendsList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: [],
//       user: "",
//       followers: []
//     };

//     // this.getSessions = this.getSessions.bind(this);
//     // this.getAllFollowers = this.getSessions.bind(this);
//     // this.getUserInfo = this.getUserInfo.bind(this);
//   }

//   componentDidMount() {
//     // this.getSessions();
//     // this.getUserInfo();
//   }

//   //   async getUserInfo() {
//   //     console.log(this.state.user.auth_id);
//   //     await axios
//   //       .get(`/api/getprofileinfo/${this.state.user.auth_id}`)
//   //       .then(res => this.setState({ currentUser: res.data[0] }))
//   //       .then(() => this.getAllFollowers());
//   //   }

//   //   getSessions() {
//   //     axios
//   //       .get("/api/session")
//   //       .then(res => {
//   //         this.setState({ user: res.data });
//   //       })
//   //       .then(() => this.getUserInfo());
//   //     // console.log(this.state.user.auth_id);
//   //   }

//   //   getAllFollowers() {
//   //     axios
//   //       .get(`/api/getlistoffollowers/${this.state.currentUser.auth_id}`)
//   //       .then(res => this.setState({ followers: res.data }));
//   //   }

//   render() {
//     // console.table(this.state);
//     // console.log(this.state.currentUser);
//     // console.log(this.state.user);
//     console.log(this.props);
//     return (
//       <div>
//         {/* <SimpleDialog followers={this.state.followers} /> */}
//         test
//         {this.state.followers}
//       </div>
//     );
//   }
// }

// export default DashboardFriendsList;
