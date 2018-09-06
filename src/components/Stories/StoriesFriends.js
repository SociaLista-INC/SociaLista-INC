// import React from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { withStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import axios from "axios";
// import Stories from "./Stories";

// const styles = {
//   row: {
//     display: "flex",
//     justifyContent: "center"
//   },
//   avatar: {
//     margin: 10
//   },
//   bigAvatar: {
//     width: 60,
//     height: 60
//   }
// };

// class StoriesFriends extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       friends: [],
//       loadingFriends: true
//     };
//     this.getFriends = this.getFriends.bind(this);
//   }

//   componentDidMount() {
//     this.getFriends(this.props.currentUser.auth_id);
//   }

//   getFriends(auth_id) {
//     axios
//       .get(`/api/getlistOffriends/${auth_id}`)
//       .then(res => this.setState({ friends: res.data, loadingFriends: false }));
//   }

//   render() {
//     const { classes } = this.props;
//     // console.log(this.props.currentUser.auth_id);
//     // console.log(this.state.friends);

//     if (this.state.loadingStories) {
//       return null;
//     }

//     let mappedFriends = this.state.friends.map((avatar, i) => {
//       // console.log(avatar);
//       return (
//         <div>
//           <Avatar
//             key={i}
//             alt={i + avatar.friend}
//             src={avatar.picture}
//             className={classes.avatar}
//             onClick={this.props.hanleOpen}
//           />
//           {/* <Stories auth_id_friends={avatar.auth_id} /> */}
//         </div>
//       );
//     });

//     return <div className={classes.row}>{mappedFriends}</div>;
//   }
// }

// StoriesFriends.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(StoriesFriends);
