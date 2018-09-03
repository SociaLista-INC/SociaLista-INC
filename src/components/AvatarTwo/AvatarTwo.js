import "./AvatarTwo.css";

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

function ImageAvatarsTwo(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Abdul Kanjo"
        src="https://media.licdn.com/dms/image/C4E03AQFzKdx-TsfaQA/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=5a3iv_5kuc54UaTX_KQ7YsMuZhDgyGl6Y_HGTfXyNbk"
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

ImageAvatarsTwo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatarsTwo);
