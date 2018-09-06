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
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Moment from "react-moment";
import Loading from "react-loading-components";
import PostLikeListOutput from "./PostLikeList";
import axios from "axios";
import Comments from "./Comments";
import CommentCreate from "./CommentCreate";
import ReactPlayer from "react-player";

const styles = theme => ({
  card: {
    width: "400px",
    marginBottom: "10px",
    minWidth: "300px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
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
    marginRight: "20px",
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
      likeList: [],
      currentUser: this.props.currentUser.auth_id,
      loading: true
    };
    this.handleEditingPost = this.handleEditingPost.bind(this);
    this.createComment = this.createComment.bind(this);
    this.getListofLikes = this.getListofLikes.bind(this);
  }
  handleEditingPost() {
    this.setState({ editing: true });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  createComment(post_id, auth_id, comment) {
    axios
      .post(`/api/post/comment`, { post_id, auth_id, comment })
      .then(() => this.handleExpandClick());
  }

  getListofLikes(post_id) {
    axios
      .get(`/api/post/userlist/like/${post_id}`)
      .then(res => this.setState({ likeList: res.data }));
  }

  render() {
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
          avatar={<Avatar alt="Adelle Charles" src={picture} />}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={<Link to={`/profile/${auth_id}`}>{name}</Link>}
          subheader={<Moment calendar="()">{time}</Moment>}
        />
        {image_url ? (
          image_url.toLowerCase().includes(".png") ? (
            <CardMedia
              className={classes.media}
              image={image_url}
              title="Contemplative Reptile"
            />
          ) : image_url.toLowerCase().includes(".jpg") ? (
            <CardMedia
              className={classes.media}
              image={image_url}
              title="Contemplative Reptile"
            />
          ) : image_url.toLowerCase().includes(".jpeg") ? (
            <CardMedia
              className={classes.media}
              image={image_url}
              title="Contemplative Reptile"
            />
          ) : image_url.toLowerCase().includes(".mp3") ? (
            <audio controls>
              <source src={image_url} type="audio/mpeg" />
            </audio>
          ) : image_url.toLowerCase().includes("youtube") ? (
            <ReactPlayer width="100%" url={image_url} />
          ) : image_url.toLowerCase().includes("soundcloud") ? (
            <ReactPlayer width="100%" url={image_url} />
          ) : (
            ""
          )
        ) : (
          ""
        )}
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
            <img
              alt="unlike btn"
              src="https://image.flaticon.com/icons/svg/838/838669.svg"
              width="20px"
            />
          </IconButton>
          {this.state.currentUser === auth_id ? (
            <IconButton
              aria-label="Delete the Post"
              onClick={() => this.props.handleDelete(post_id)}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          ) : (
            ""
          )}
          <PostLikeListOutput
            post_id={post_id}
            getListofLikes={this.getListofLikes}
            likeList={this.state.likeList}
            likestotal={likestotal}
          />

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Comments post_id={post_id} currentUser={this.state.currentUser} />
          <CommentCreate
            post_id={post_id}
            auth_id={this.state.currentUser}
            createComment={this.createComment}
          />
        </Collapse>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
