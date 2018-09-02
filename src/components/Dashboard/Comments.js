import React from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  getComments(post_id) {
    axios.get(`/api/post/comments/${post_id}`).then(res => {
      this.setState({ comments: res.data });
    });
  }

  componentDidMount() {
    this.getComments(this.props.post_id);
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props);
    // console.log(this.state);

    let commentsection = this.state.comments.map((com, i) => {
      console.log(com);
      return (
        <Typography paragraph key={i}>
          {com.comment} By: {com.name}
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
