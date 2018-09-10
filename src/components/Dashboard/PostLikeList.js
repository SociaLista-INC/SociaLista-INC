import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import blue from "@material-ui/core/colors/blue";

let getUsers = [];

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class PostLikeList extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    // console.log(getUsers);

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            backgroundColor: "#292A3A",
            color: "#D3D3D3"
          }}
          id="simple-dialog-title"
        >
          <div style={{ color: "#D3D3D3" }}>Liked By</div>
        </DialogTitle>
        <div style={{ backgroundColor: "#292A3A", color: "#D3D3D3" }}>
          <List>
            {getUsers.map((user, i) => (
              // console.log(user)
              <ListItem
                button
                onClick={() => this.handleListItemClick(user)}
                key={i}
              >
                <ListItemAvatar>
                  <Avatar
                    className={classes.avatar}
                    alt={user.name}
                    src={user.picture}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={<div style={{ color: "#D3D3D3" }}>{user.name}</div>}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

PostLikeList.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  post_id: PropTypes.isRequired
};

const SimpleDialogWrapped = withStyles(styles)(PostLikeList);

class PostLikeListOutput extends React.Component {
  state = {
    open: false,
    selectedValue: getUsers[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    // console.log(this.props);

    getUsers = this.props.likeList;

    return (
      <div>
        <br />

        <Button
          style={{ color: "#D3D3D3" }}
          className="like-btn-postlike"
          onClick={() => {
            this.props.getListofLikes(this.props.post_id);
            this.handleClickOpen();
          }}
        >
          {this.props.likestotal > 1 ? (
            <div>{this.props.likestotal} Likes</div>
          ) : (
            <div>{this.props.likestotal} Like</div>
          )}
        </Button>

        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default PostLikeListOutput;
