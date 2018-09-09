import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Loading from "react-loading-components";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

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
    fontSize: 14,
    color: "#D3D3D3"
  },
  pos: {
    marginBottom: 12
  }
};

class HashTagComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HashTags: [],
      dense: false,
      secondary: true,
      loading: true
    };
  }

  componentDidMount() {
    axios.get("/api/hashtags").then(res => {
      console.log(res);
      this.setState({ HashTags: res.data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading type="puff" width={100} height={100} fill="#f44242" />;
    }
    return (
      <div>
        <Card
          style={{ backgroundColor: "#292A3A" }}
          className={this.props.classes.card}
        >
          <CardContent>
            <TrendingUpIcon style={{ color: "#D3D3D3" }} />
            <Typography
              className={this.props.classes.title}
              color="textSecondary"
            >
              Trending HashTags
            </Typography>
            <List dense={this.state.dense}>
              {this.state.HashTags.map((e, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={<div style={{ color: "#D3D3D3" }}>#{e.tag}</div>}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

HashTagComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(HashTagComponent);
