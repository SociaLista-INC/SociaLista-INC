// import "./Footer.css";

// import React from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { withStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";

// const styles = {
//   row: {
//     display: "flex",
//     justifyContent: "center"
//   },
//   avatar: {
//     margin: 50
//   },
//   bigAvatar: {
//     width: 100,
//     height: 100
//   }
// };

// function ImageAvatars(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.row}>
//       <Avatar
//         alt="Abdul Kanjo"
//         src="https://media.licdn.com/dms/image/C4E03AQFzKdx-TsfaQA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=5a3iv_5kuc54UaTX_KQ7YsMuZhDgyGl6Y_HGTfXyNbk"
//         className={classNames(classes.avatar, classes.bigAvatar)}
//       />
//       <Avatar
//         alt="Kaustubh Deshpande"
//         src="https://avatars0.githubusercontent.com/u/29470373?s=460&v=4"
//         className={classNames(classes.avatar, classes.bigAvatar)}
//       >
//         <a href="https://github.com/KaustubhDeshpandeDev">
//           <img
//             src="https://image.flaticon.com/icons/svg/25/25231.svg"
//             width="20px"
//           />
//         </a>
//       </Avatar>

//       <Avatar
//         alt="Abhishek Duggal"
//         src="https://media.licdn.com/dms/image/C4D03AQEsv9f8NiLcNA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=bCRpktbCgnuidiTFHMbwDdxKJNwGOcEYdnVImvblvIQ"
//         className={classNames(classes.avatar, classes.bigAvatar)}
//       />
//     </div>
//   );
// }

// ImageAvatars.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ImageAvatars);

import React, { Component } from "react";
import { Footer } from "react-materialize";
import "./Footer.css";

import ImageAvatars from "../Avatars/Avatars";
import ImageAvatarsTwo from "../AvatarTwo/AvatarTwo";
import ImageAvatarsThree from "../AvatarThree/AvatarThree";

class Footers extends Component {
  render() {
    return (
      <div className="footerBody">
        <Footer id="myfooter">
          {" "}
          <h4
            style={{ marginTop: "0px", marginBottom: "0px", paddingTop: "2vh" }}
          >
            Project by Kaustubh Deshpande, Abdul Kanjo, Abhishek Duggal
          </h4>
          <div id="avatar-container">
            <ImageAvatars id="avatar-container" />
            <ImageAvatarsTwo id="avatar-container-two" />
            <ImageAvatarsThree id="avatar-container-three" />
          </div>
          <p
            className="grey-text text-lighten-4"
            style={{
              marginTop: "1px",
              marginBottom: "0px",
              fontSize: "2vh",
              padding: "0px"
            }}
          >
            This website was coded as an example to demonstrate our skills. This
            website is active, with active users using it for its intended
            purpose. If you have a need for a custom website or software, feel
            free to reach out to us through of of our social media links below.
          </p>
        </Footer>
      </div>
    );
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Abdul Kanjo"
        src="https://media.licdn.com/dms/image/C4E03AQFzKdx-TsfaQA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=5a3iv_5kuc54UaTX_KQ7YsMuZhDgyGl6Y_HGTfXyNbk"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
      <Avatar
        alt="Kaustubh Deshpande"
        src="https://avatars0.githubusercontent.com/u/29470373?s=460&v=4"
        className={classNames(classes.avatar, classes.bigAvatar)}
      >
        <a href="https://github.com/KaustubhDeshpandeDev">
          <img
            alt="name"
            src="https://image.flaticon.com/icons/svg/25/25231.svg"
            width="20px"
          />
        </a>
      </Avatar>

      <Avatar
        alt="Abhishek Duggal"
        src="https://media.licdn.com/dms/image/C4D03AQEsv9f8NiLcNA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=bCRpktbCgnuidiTFHMbwDdxKJNwGOcEYdnVImvblvIQ"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

export default Footers;

{
  /* <Avatar
  alt="Kaustubh Deshpande"
  src="https://avatars0.githubusercontent.com/u/29470373?s=460&v=4"
  className={classNames(classes.avatar, classes.bigAvatar)}
>
  <a href="https://github.com/KaustubhDeshpandeDev">
    <img src="https://image.flaticon.com/icons/svg/25/25231.svg" width="20px" />
  </a>
</Avatar>; */
}
