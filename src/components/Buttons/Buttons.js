import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import AddIcon from "@material-ui/icons/Add";
// import Icon from "@material-ui/core/Icon";
// import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    border: "2px solid #ff524e",
    borderRadius: " 200px",
    paddingTop: "9px",
    paddingBottom: "8px",
    paddingLeft: "19px",
    paddingRight: "19px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: "#ff524e"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <a href={process.env.REACT_APP_AUTH_LOGIN}>
        <Button
          variant="outlined"
          color="secondary"
          aria-label="Delete"
          className={classes.button}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Connect
        </Button>
      </a>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
