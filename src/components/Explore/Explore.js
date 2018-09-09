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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import LinkBtn from "@material-ui/icons/Link";
import IconButton from "@material-ui/core/IconButton";
import "./Explore.css";
import axios, { Link } from "axios";

const styles = {
  card: {
    width: "400px",
    minWidth: "300px",
    marginBottom: "10px",
    height: "530px",
    overflow: "scroll",
    marginTop: "50px",
    backgroundColor: "#292A3A"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: "#d3d3d3"
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

    // console.log(this.state.mostRecentFollowers);

    return (
      <div className="explore-main">
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
                      primary={
                        <div style={{ color: "#D3D3D3" }}>
                          <b>{e.name}</b> liked <b>{e.userwithpost}</b>
                          's post "{e.content}"
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                New Users
              </Typography>
              <List dense={dense}>
                {this.state.mostRecentFollowers.map((e, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar alt={e.name} src={e.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <div style={{ color: "#D3D3D3" }}>
                          <b>{e.name}</b> is new to SociaLista! Connect with
                          them here!
                        </div>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        style={{ color: "#D3D3D3" }}
                        href={`${process.env.REACT_APP_LINK_USERS}${e.auth_id}`}
                        aria-label="Link"
                      >
                        <LinkBtn />
                      </IconButton>
                    </ListItemSecondaryAction>
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
                      primary={
                        <div style={{ color: "#D3D3D3" }}>
                          <b>{e.name}</b> commented on{" "}
                          <b>
                            {e.userwithpost}
                            's
                          </b>{" "}
                          post "{e.content}"
                        </div>
                      }
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
