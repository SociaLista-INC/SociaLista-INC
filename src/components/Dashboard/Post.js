import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      currentUser: this.props.currentUser.auth_id
    };
    this.handleEditingPost = this.handleEditingPost.bind(this);
  }
  handleEditingPost() {
    this.setState({ editing: true });
  }

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
      image_url
    } = this.props.e;

    return (
      <div>
        <Link to={`/profile/${auth_id}`}>{name}</Link>
        <img alt="" src={picture} width="70px" />
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
        <div>{likestotal}</div>
        <img alt="" src={image_url} width="70px" />
        <button onClick={() => this.props.handleLikePost(post_id)}>
          Like Post
        </button>
        <button onClick={() => this.props.handleDeleteLikePost(post_id)}>
          Dislike Post
        </button>
        <button onClick={() => this.props.handleDelete(post_id)}>Delete</button>
      </div>
    );
  }
}

export default Post;
