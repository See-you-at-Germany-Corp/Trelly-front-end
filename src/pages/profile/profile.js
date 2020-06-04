import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import styled from 'styled-components'
import AppIcon from "../../image/icon.png";
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './profileStyle.css';
const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "40px auto 40px auto",
  },
  pageTitle: {
    margin: "20px auto 20px auto",
  },
  TextField: {
    margin: "10px auto 10px auto",
  },
  button: {
    margin: "5px auto 5px auto",
  },
};

class profile extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      initials: "",
      userName: "",
      bio: "",
      loading: false,
      error: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      fullName: this.state.fullName,
      initials: this.state.initials,
      userName: this.state.userName,
      bio: this.state.bio,
    };
    //Rest
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div class="tabbed-pane-nav u-clearfix js-nav">
            <ul>
              <li class="tabbed-pane-nav-item">
                <a
                  class="tabbed-pane-nav-item-button js-member-profile active"
                  data-tab="profile"
                  href="/marklatthapol"
                >
                  Profile and Visibility
                </a>
              </li>
              <li class="tabbed-pane-nav-item">
                <a
                  class="tabbed-pane-nav-item-button js-member-activity"
                  data-tab="cards"
                  href="/marklatthapol/activity"
                >
                  Activity
                </a>
              </li>
              <li class="tabbed-pane-nav-item">
                <a
                  class="tabbed-pane-nav-item-button js-member-cards"
                  data-tab="cards"
                  href="/marklatthapol/cards"
                >
                  Cards
                </a>
              </li>
              <li class="tabbed-pane-nav-item">
                <a
                  class="tabbed-pane-nav-item-button js-member-account"
                  data-tab="settings"
                  href="/marklatthapol/account"
                >
                  Settings
                </a>
              </li>
              <li class="tabbed-pane-nav-item">
                <a
                  class="tabbed-pane-nav-item-button js-billing"
                  data-tab="trello-gold"
                  href="/marklatthapol/billing"
                >
                  <span class="icon-sm icon-trello-gold mod-inline icon-trello-gold-color"></span>{" "}
                  Trello Gold
                </a>
              </li>
            </ul>
          </div>
      <ProfileContainer container className={classes.form}>
          
        <Grid item sm />
        <Grid item sm>
          <img
            src={AppIcon}
            alt="Test"
            className={classes.image}
            width="100"
            height="100"
          />
          <Typography variant="h3" className={classes.pageTitle}>
            Profile
            <hr width="60%" />
          </Typography>

          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="full-name"
              name="full-name"
              type="text"
              label="full-name"
              className={classes.TextField}
              value={this.state.fullName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="initials"
              name="initials"
              type="text"
              label="initials"
              className={classes.TextField}
              value={this.state.initials}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="username"
              name="username"
              type="text"
              label="username"
              className={classes.TextField}
              value={this.state.userName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="bio"
              name="bio"
              type="text"
              label="bio"
              className={classes.TextField}
              value={this.state.bio}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </ProfileContainer>
      </div>
    );
  }
}

profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ProfileContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    overflow: visible;
    float: left
`

export default withStyles(styles)(profile);
