import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class PostCreate extends React.Component {
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
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Write a Post</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
              numquam, facere explicabo debitis iure aperiam iste ea eius illo
              culpa! Nam reiciendis at numquam distinctio, cum corporis non
              provident voluptates.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Post"
              type="email"
              fullWidth
              onChange={e => this.props.handleContentChange(e.target.value)}
            />
            <TextField
              margin="dense"
              id="ur"
              label="Enter an Image URL or select one below"
              type="input"
              fullWidth
              onChange={e => this.props.handleImageUrlChange(e.target.value)}
            />
            <Button label="My Label">
              <input type="file" />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.props.handlePostClick();
                this.handleClose();
              }}
              color="primary"
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
