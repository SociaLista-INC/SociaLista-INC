import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
};

class StoriesCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.row}>
          <Avatar
            alt="Story"
            src="https://image.flaticon.com/icons/svg/1099/1099295.svg"
            className={classes.avatar}
            onClick={this.handleClickOpen}
          />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Story</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="ur"
              label="Take a photo!"
              fullWidth
              onChange={e => this.props.handelUrlText(e.target.value)}
            />

            <TextField
              margin="dense"
              id="name"
              label="Title"
              fullWidth
              onChange={e => this.props.handleTitleChange(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.props.handleStoryCreateClick();
                this.handleClose();
              }}
              color="primary"
            >
              Story
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

StoriesCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StoriesCreate);
