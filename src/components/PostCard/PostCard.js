import React from "react";
import "./PostCard.css";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";
import axios from "axios";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import ReactPlayer from "react-player";

import Comments from "../Dashboard/Comments";
import CommentCreate from "../Dashboard/CommentCreate";
import PostLikeListOutput from "../Dashboard/PostLikeList";

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

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      likeList: []
    };

    this.createComment = this.createComment.bind(this);
    this.getListofLikes = this.getListofLikes.bind(this);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  createComment(post_id, auth_id, comment) {
    // console.log(post_id, auth_id, comment);
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
    // console.log(this.props);

    const { classes } = this.props;

    let mappedPosts = this.props.posts.map((e, i) => {
      return (
        <Card key={i} className={classes.card}>
          <CardHeader
            avatar={<Avatar alt="Adelle Charles" src={e.picture} />}
            title={e.name}
            subheader={<Moment calendar="()">{e.time}</Moment>}
          />
          {e.image_url ? (
            e.image_url.toLowerCase().includes(".png") ? (
              <CardMedia
                className={classes.media}
                image={e.image_url}
                title="Contemplative Reptile"
              />
            ) : e.image_url.toLowerCase().includes(".jpg") ? (
              <CardMedia
                className={classes.media}
                image={e.image_url}
                title="Contemplative Reptile"
              />
            ) : e.image_url.toLowerCase().includes(".jpeg") ? (
              <CardMedia
                className={classes.media}
                image={e.image_url}
                title="Contemplative Reptile"
              />
            ) : e.image_url.toLowerCase().includes(".mp3") ? (
              <audio controls>
                <source src={e.image_url} type="audio/mpeg" />
              </audio>
            ) : e.image_url.toLowerCase().includes("youtube") ? (
              <ReactPlayer width="100%" url={e.image_url} />
            ) : e.image_url.toLowerCase().includes("soundcloud") ? (
              <ReactPlayer width="100%" url={e.image_url} />
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <CardContent>
            <Typography component="p">{e.content}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Like the Post"
              onClick={() => this.props.handleLikePost(e.post_id)}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              aria-label="Share"
              onClick={() => this.props.handleDeleteLikePost(e.post_id)}
            >
              <img
                alt="unlike btn"
                src="https://image.flaticon.com/icons/svg/838/838669.svg"
                width="20px"
              />
            </IconButton>
            {this.props.user.auth_id === e.auth_id ? (
              <IconButton
                aria-label="Delete the Post"
                onClick={() => this.props.handleDelete(e.post_id)}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            ) : (
              ""
            )}

            <PostLikeListOutput
              post_id={e.post_id}
              getListofLikes={this.getListofLikes}
              likeList={this.state.likeList}
              likestotal={e.likestotal}
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
            <Comments
              post_id={e.post_id}
              currentUser={this.props.currentUser.auth_id}
            />
            <CommentCreate
              post_id={e.post_id}
              auth_id={this.props.currentUser.auth_id}
              createComment={this.createComment}
            />
          </Collapse>
        </Card>
      );
    });

    return <div className="list-posts-postCard">{mappedPosts}</div>;
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  getUserInfo: PropTypes.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
