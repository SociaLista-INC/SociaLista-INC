import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import classNames from "classnames";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import axios from "axios";
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    left: false,
    name: "React",
    open: false,
    user: "",
    userOnSessions: null
  };

  handleMenuClick1() {
    this.setState({ pageNumber: 1 });
    this.handleDrawerClick();
  }

  componentDidMount() {
    this.getSessions();
  }
  async getSessions() {
    await axios
      .get("/api/session")
      .then(res => {
        console.log(res.data.auth_id);
        this.setState({ user: res.data.auth_id });
      })
      .then(() => this.gettingUser());
  }
  gettingUser = () => {
    console.log(this.state);
    axios.get(`/api/getprofileinfo/${this.state.user}`).then(res => {
      this.setState({ userOnSessions: res.data[0].picture });
      console.log("the data needed", this.state.userOnSessions);
    });
  };

  handleMenuClick2() {
    this.setState({ pageNumber: 2 });
    this.handleDrawerClick();
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleDrawerClick() {
    // if (this.state.open == false) this.setState({ open: true });
    // else this.setState({ open: false });
    // this.setState({ open: true });
    if (this.state.open === false) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  render() {
    console.log(this.state.user);
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log("hello ", this.state.userOnSessions);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              onClick={() => this.handleDrawerClick()}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.open}>
              <MenuItem>
                <Link onClick={() => this.setState({ open: false })} to="/">
                  Home
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link
                  onClick={() => this.setState({ open: false })}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </MenuItem>
              <Divider />
            </Drawer>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Photos
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {this.state.userOnSessions && (
                    <Avatar
                      alt="Adelle Charles"
                      src={this.state.userOnSessions}
                      className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to={`/profile/${this.state.user}`}>Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
