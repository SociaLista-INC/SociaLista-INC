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

var emails = ["username@gmail.com", "user02@gmail.com"];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    // console.log(emails);
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            color: "#D3D3D3",
            backgroundColor: "#292A3A"
          }}
          id="simple-dialog-title"
        >
          <div style={{ color: "#D3D3D3" }}>Followers</div>
        </DialogTitle>

        <div>
          <List
            style={{
              color: "#D3D3D3",
              backgroundColor: "#292A3A"
            }}
          >
            {emails.map((email, i) => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={i}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Adelle Charles"
                    src={email.picture}
                    // className={classNames(classes.avatar, classes.bigAvatar)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<div style={{ color: "#D3D3D3" }}>{email.name}</div>}
                />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.handleListItemClick("addAccount")}
            />
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1]
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
    // console.log(this.props.numOfFollowes);
    emails = this.props.followers;
    // console.log(emails);
    return (
      <div>
        <br />
        <Button style={{ color: "#D3D3D3" }} onClick={this.handleClickOpen}>
          Followers {this.props.numOfFollowes}
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

export default SimpleDialogDemo;
