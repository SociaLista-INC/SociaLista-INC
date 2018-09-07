import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";
import TextMobileStepper from "./StoryDisplay";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import StoriesCreate from "./StoriesCreate";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  //   const top = 50 + rand();
  //   const left = 50 + rand();

  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 10
  }
});

class SimpleModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      stories: [],
      currentUser: "",
      friends: [],
      loadingStories: true,
      loadingFriends: true,
      title: "",
      img_url: ""
    };
    this.getStories = this.getStories.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.handleClickStory = this.handleClickStory.bind(this);
    this.handelUrlText = this.handelUrlText.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStoryCreateClick = this.handleStoryCreateClick.bind(this);
    this.createStory = this.createStory.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getFriends(this.props.currentUser.auth_id);
    // this.getStories(this.props.currentUser.auth_id);
  }

  getStories(auth_id) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/getstories/${auth_id}`).then(res => {
        this.setState({ stories: res.data, loadingStories: false }, () =>
          resolve()
        );
      });
    });
  }

  getFriends(auth_id) {
    axios.get(`/api/getlistOffriends/${auth_id}`).then(res => {
      this.setState({ friends: res.data, loadingFriends: false });
    });
  }

  handleClickStory(auth_id) {
    // console.log(auth_id);
    this.getStories(auth_id).then(() => this.handleOpen());
  }

  handleTitleChange(title) {
    this.setState({ title });
  }

  handelUrlText(img_url) {
    this.setState({ img_url });
  }

  handleStoryCreateClick() {
    let { title, img_url } = this.state;
    let { auth_id } = this.props.currentUser;
    this.createStory(auth_id, title, img_url);
  }

  createStory(auth_id, title, img_url) {
    axios
      .post(`/api/story/create`, { auth_id, title, img_url })
      .then(res => {
        this.getFriends(this.props.currentUser.auth_id);
        this.setState({ title: "", img_url: "" });
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log(this.state.friends);

    const { classes } = this.props;

    if (this.state.loadingFriends) {
      return null;
    }
    let mappedAvatars = this.state.friends.map((avatar, i) => {
      return (
        <Avatar
          key={i}
          onClick={() => this.handleClickStory(avatar.auth_id)}
          alt={i + avatar.friend}
          src={avatar.picture}
          className={classes.avatar}
        />
      );
    });

    let mappedStories = this.state.stories.map((story, i) => {
      // console.log(story);
      return {
        label: story.title,
        imgPath: story.img_url
      };
    });

    return (
      <div>
        <Typography gutterBottom>Checkout Stories!</Typography>
        <StoriesCreate
          handleTitleChange={this.handleTitleChange}
          handelUrlText={this.handelUrlText}
          handleStoryCreateClick={this.handleStoryCreateClick}
        />
        <div className={classes.row}>{mappedAvatars}</div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <TextMobileStepper mappedStories={mappedStories} />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
