import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
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
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Explore.css";

const styles = {
  card: {
    width: "400px",
    minWidth: "300px",
    marginBottom: "10px"
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
      secondary: false
    };
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
    const bull = <span className={classes.bullet}>•</span>;
    const { dense, secondary } = this.state;
    return (
      <div className="explore-cards">
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Word of the Day
            </Typography>
            <List dense={dense}>
              {this.generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Word of the Day
            </Typography>
            <List dense={dense}>
              {this.generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Word of the Day
            </Typography>
            <List dense={dense}>
              {this.generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Explore.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Explore);
