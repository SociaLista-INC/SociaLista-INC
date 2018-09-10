import React from "react";
import "./DashBoard.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import ContentEditable from "react-contenteditable";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import Avatar from "@material-ui/core/Avatar";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      editing: false,
      commentEdit: ""
    };
    this.getComments = this.getComments.bind(this);
    this.handleEditingComment = this.handleEditingComment.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleSendCommentEdit = this.handleSendCommentEdit.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  getComments(post_id) {
    axios.get(`/api/post/comments/${post_id}`).then(res => {
      this.setState({ comments: res.data });
    });
  }

  handleEditingComment() {
    this.setState({ editing: true });
  }

  handleCommentEdit(commentEdit) {
    this.setState({ commentEdit });
  }

  handleSendCommentEdit(comment_id) {
    axios
      .put(`/api/post/comment/${comment_id}`, {
        comment: this.state.commentEdit
      })
      .then(() => {
        this.getComments(this.props.post_id);
        this.setState({ comment_id: "" });
      })
      .catch(err => console.log(err));
  }

  handleDeleteComment(comment_id) {
    axios
      .delete(`/api/post/comment/${comment_id}`)
      .then(() => {
        this.getComments(this.props.post_id);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getComments(this.props.post_id);
  }

  render() {
    // const { classes } = this.props;
    // console.log(this.props);
    // console.log(this.state);

    let commentsection = this.state.comments.map((com, i) => {
      return (
        <div className="comments-section-comments" key={i}>
          <div>
            <Avatar
              // className={this.props.classes.avatar}
              alt={com.picture}
              src={com.picture}
            />
          </div>
          <div className="comments-section-comments-text">
            <Typography style={{ color: "#D3D3D3" }}>
              {!this.state.editing ? (
                <Typography
                  style={{ color: "#D3D3D3" }}
                  paragraph
                  onClick={e => this.handleEditingComment(e)}
                >
                  {com.comment}
                  {this.props.currentUser === com.auth_id ? (
                    <IconButton
                      style={{ color: "#D3D3D3" }}
                      color="#D3D3D3"
                      aria-label="Delete the Post"
                      onClick={() => this.handleDeleteComment(com.comment_id)}
                    >
                      <DeleteForeverOutlinedIcon color="#D3D3D3" />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Typography>
              ) : this.props.currentUser === com.auth_id ? (
                <ContentEditable
                  onChange={e => this.handleCommentEdit(e.target.value)}
                  html={com.comment}
                  onBlur={() => {
                    this.handleSendCommentEdit(com.comment_id);
                    this.setState({ editing: false });
                  }}
                />
              ) : (
                <Typography paragraph key={i}>
                  {com.comment} By: {com.name}
                </Typography>
              )}
            </Typography>
          </div>
          <div className="comments-section-comments-btn" />
        </div>
      );
    });
    return (
      <CardContent>
        <Typography style={{ color: "#D3D3D3" }} paragraph variant="body2">
          {this.state.comments[0] ? "Comments" : "No comments yet"}
        </Typography>
        {commentsection}
      </CardContent>
    );
  }
}

export default Comments;
