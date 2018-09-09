import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import axios from "axios";

export default class CommentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      comment: ""
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCommentChange(comment) {
    this.setState({ comment });
  }

  createPostComment() {
    let { post_id, auth_id } = this.props;
    let { comment } = this.state;

    this.props.createComment(post_id, auth_id, comment);
    this.handleClose();
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
    return (
      <div>
        <Button style={{ color: "#D3D3D3" }} onClick={this.handleClickOpen}>
          Leave a comment
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            style={{ backgroundColor: "#292A3A", color: "#D3D3D3" }}
            // id="form-dialog-title"
          >
            Comment
          </DialogTitle>
          <DialogContent style={{ backgroundColor: "#292A3A" }}>
            <DialogContentText
              style={{ backgroundColor: "#292A3A", color: "#D3D3D3" }}
            >
              Thanks for leaving a comment
            </DialogContentText>
            <TextField
              style={{ backgroundColor: "#292A3A", color: "#D3D3D3" }}
              autoFocus
              color="#D3D3D3"
              margin="dense"
              onChange={e => this.handleCommentChange(e.target.value)}
              id="name"
              label="Say something!"
              type="comment"
              fullWidth
            />
          </DialogContent>
          <DialogActions style={{ backgroundColor: "#292A3A", margin: 0 }}>
            <Button
              style={{ color: "#D3D3D3" }}
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              style={{ color: "#D3D3D3" }}
              onClick={() => this.createPostComment()}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
