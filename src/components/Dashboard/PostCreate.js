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
    // console.log(this.props.file);
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Be Social, Create a Post</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Say something!"
              fullWidth
              onChange={e => this.props.handleContentChange(e.target.value)}
            />
            <TextField
              margin="dense"
              id="ur"
              label="Image, mp3 / mp4, SoundCloud, YouTube"
              fullWidth
              onChange={e => this.props.handelUrlText(e.target.value)}
            />
            <Button label="My Label">
              <form onSubmit={this.props.handleImageUrlChange}>
                <input
                  label="upload file"
                  type="file"
                  accept=".png, .jpg, .jpeg, .mp4, .mp3"
                  onChange={this.props.handleFileUpload}
                />
                <Button type="submit">Upload</Button>
              </form>
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
