import "./AvatarThree.css";

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 35
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
};

function ImageAvatarsThree(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Abhishek Duggal"
        src="https://media.licdn.com/dms/image/C4D03AQEsv9f8NiLcNA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=bCRpktbCgnuidiTFHMbwDdxKJNwGOcEYdnVImvblvIQ"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
      <div id="link-container">
        <a href="https://github.com/KaustubhDeshpandeDev">
          <img
            src="https://image.flaticon.com/icons/svg/25/25231.svg"
            width="25px"
          />
        </a>
        <a href="https://www.google.com">
          <img
            src="https://image.flaticon.com/icons/svg/34/34405.svg"
            width="25px"
          />
        </a>
      </div>
    </div>
  );
}

ImageAvatarsThree.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatarsThree);
