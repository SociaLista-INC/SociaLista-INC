import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Explore from "@material-ui/icons/Explore";
import Link from "@material-ui/icons/Link";
import Loading from "react-loading-components";

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
      secondary: true,
      loading: true
    };
  }
  componentDidMount() {
    this.getNews();
  }
  getNews() {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
          process.env.REACT_APP_NEWS_API
        }`
      )
      .then(res => {
        this.setState({ news: res.data.articles, loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading type="puff" width={100} height={100} fill="#f44242" />;
    }

    return (
      <div>
        <div className="trending-cards">
          <Card className={this.props.classes.card}>
            <CardContent>
              <Explore />
              <Typography
                className={this.props.classes.title}
                color="textSecondary"
              >
                News
              </Typography>
              <List dense={this.state.dense}>
                {this.state.news.map((e, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={e.title}
                      secondary={
                        this.state.secondary
                          ? e.description
                            ? `${e.description}`
                            : ""
                          : ""
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton href={e.url} aria-label="Link">
                        <Link />
                      </IconButton>
                    </ListItemSecondaryAction>
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

Trending.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Trending);
