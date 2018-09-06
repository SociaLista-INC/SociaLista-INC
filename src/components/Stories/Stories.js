import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextMobileStepper from "./StoryDisplay";
import axios from "axios";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
  }
});

class SimpleModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      stories: []
    };
    this.getStories = this.getStories.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getStories();
  }

  getStories() {
    axios
      .get("/api/getstories")
      .then(res => this.setState({ stories: res.data }));
  }

  render() {
    const { classes } = this.props;

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
        <Button onClick={this.handleOpen}>Stories</Button>
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
