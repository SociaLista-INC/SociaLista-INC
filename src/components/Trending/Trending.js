import React, { Component } from "react";
import HashTagComponent from "../HashTags/HashTagComponent";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

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

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      dense: false,
      secondary: false
    };
  }
  componentDidMount() {
    this.getNews();
  }
  getNews() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=8d34de7e65e74b73849435f89f395b6e"
      )
      .then(res => {
        console.log(res.data.articles);
        this.setState({ news: res.data.articles });
      });
  }

  render() {
    // console.log(this.state.news);

    let mappedNews = this.state.news.map((e, i) => {
      return (
        <div>
          <div>
            <a href={e.url}>{e.title}</a>
          </div>
          <div>{e.description}</div>
        </div>
      );
    });
    return (
      <div>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography
              className={this.props.classes.title}
              color="textSecondary"
            >
              Recent Likes
            </Typography>
            <List dense={this.state.dense}>
              {this.state.news.map((e, i) => (
                <ListItem key={i}>
                  {/* <ListItemAvatar>
                      <Avatar alt={e.name} src={e.picture} />
                    </ListItemAvatar> */}
                  <ListItemText primary={<a href={e.url}>{e.title}</a>} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <HashTagComponent />
      </div>
    );
  }
}

Trending.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Trending);
