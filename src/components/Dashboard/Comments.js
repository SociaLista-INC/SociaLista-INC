import React from "react";
// import Collapse from "@material-ui/core/Collapse";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import ContentEditable from "react-contenteditable";

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

  componentDidMount() {
    this.getComments(this.props.post_id);
  }

  render() {
    // const { classes } = this.props;
    // console.log(this.props);
    // console.log(this.state);

    let commentsection = this.state.comments.map((com, i) => {
      //   console.log(com);
      return (
        <Typography key={i}>
          {!this.state.editing ? (
            <Typography paragraph onClick={e => this.handleEditingComment(e)}>
              {com.comment} By: {com.name}
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
      );
    });
    return (
      <CardContent>
        <Typography paragraph variant="body2">
          Comments:
        </Typography>
        {commentsection}
      </CardContent>
    );
  }
}

export default Comments;
