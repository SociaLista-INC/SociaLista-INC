import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import "./Explore.css";
import axios from "axios";

const styles = {
  card: {
    width: "400px",
    minWidth: "300px",
    marginBottom: "10px",
    height: "530px",
    overflow: "scroll",
    marginTop: "50px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: false,
      secondary: false,
      mostRecentLikes: [],
      mostRecentComments: [],
      mostRecentFollowers: []
    };
  }

  componentDidMount() {
    this.getMostRecentLikes();
    this.getMostRecentComments();
    this.getMostRecentFollowers();
  }

  getMostRecentLikes() {
    axios
      .get("/api/getrecentlikes")
      .then(res => this.setState({ mostRecentLikes: res.data }));
  }

  getMostRecentComments() {
    axios
      .get("/api/getrecentcomments")
      .then(res => this.setState({ mostRecentComments: res.data }));
  }

  getMostRecentFollowers() {
    axios
      .get("/api/getrecentfollowers")
      .then(res => this.setState({ mostRecentFollowers: res.data }));
  }

  generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value
      })
    );
  }
  render() {
    const { classes } = this.props;
    const { dense } = this.state;
    console.log(this.state.mostRecentFollowers);

    return (
      <div>
        <h1 className="header-explore">Activity</h1>
        <div className="explore-cards">
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Recent Likes
              </Typography>
              <List dense={dense}>
                {this.state.mostRecentLikes.map((e, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar alt={e.name} src={e.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${e.name} liked ${e.userwithpost}'s post "${
                        e.content
                      }"`}
                      // {`${e.name} liked ${e.userwithpost}'s post "${
                      //   e.content
                      // }"`}
                      // {`${e.name} liked ${e.userwithpost}'s post "${
                      //   e.content
                      // }"`}
                      // {
                      //   <div>
                      //     <div>
                      //       <div>
                      //         {e.name}
                      //         liked {e.userwithpost}
                      //         's post
                      //       </div>
                      //     </div>
                      //   </div>
                      // }
                      // {`${e.name} liked ${e.userwithpost}'s post "${
                      //   e.content
                      // }"`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Followers
              </Typography>
              <List dense={dense}>
                {this.state.mostRecentFollowers.map((e, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar alt={e.name} src={e.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${e.name} started following ${e.beingfollowed}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Recent Comments
              </Typography>
              <List dense={dense}>
                {this.state.mostRecentComments.map((e, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar alt={e.name} src={e.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${e.name} commented on ${
                        e.userwithpost
                      }'s post "${e.content}"`}
                      // secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Explore);
