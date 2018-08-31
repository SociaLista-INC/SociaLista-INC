import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      editing: false,
      currentUser: this.props.currentUser.auth_id
    };
    this.handleEditingPost = this.handleEditingPost.bind(this);
  }
  handleEditingPost() {
    this.setState({ editing: true });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    // console.log("state", this.state);
    // console.log("props", this.props);

    let {
      name,
      picture,
      content,
      post_id,
      likestotal,
      auth_id,
      image_url,
      time
    } = this.props.e;

    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label={name} className={classes.avatar}>
              {name}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={<Link to={`/profile/${auth_id}`}>{name}</Link>}
          subheader={time}
        />

        <CardMedia
          className={classes.media}
          image={image_url}
          title="We need a Title"
        />

        <CardContent>
          {!this.state.editing ? (
            <p onClick={e => this.handleEditingPost(e)}>{content}</p>
          ) : this.state.currentUser === auth_id ? (
            <ContentEditable
              onChange={e => this.props.handleContentEdit(e.target.value)}
              html={content}
              onBlur={() => {
                this.props.handleSendContentEdit(post_id);
                this.setState({ editing: false });
              }}
            />
          ) : (
            <p onClick={e => this.handleEditingPost(e)}>{content}</p>
          )}
        </CardContent>

        <img alt="" src={picture} width="70px" />
        <div>{likestotal}</div>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Like the Post"
            onClick={() => this.props.handleLikePost(post_id)}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="Share"
            onClick={() => this.props.handleDeleteLikePost(post_id)}
          >
            <ShareIcon />
          </IconButton>

          {this.state.currentUser === auth_id ? (
            <IconButton
              aria-label="Delete the Post"
              onClick={() => this.props.handleDelete(post_id)}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          ) : (
            <nothing />
          )}
        </CardActions>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
