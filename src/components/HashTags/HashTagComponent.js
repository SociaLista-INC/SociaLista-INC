import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import HashTags from "./HashTags";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function HashTagComponent(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="HashTags" />
        </ListItem>
        <ListItem button>
          <HashTags />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" />
    </div>
  );
}

HashTagComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HashTagComponent);
