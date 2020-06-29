import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import styled from "styled-components";
//import AppIcon from "../../image/icon.png";
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./profileStyle.css";
import BarProfile from "../profile/barProfile";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
const styles = {
  form: {
    textAlign: "center",
    margin: "20px auto 20px auto",
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
      picture: ""
    };
  }
  //Get user data

  
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      fullName: this.state.fullName,
      initials: this.state.initials,
      userName: this.state.userName,
      bio: this.state.bio,
      picture: this.state.picture,
    });
    const userData = {
      fullName: this.state.fullName,
      initials: this.state.initials,
      userName: this.state.userName,
      bio: this.state.bio,
      picture: this.state.picture,
    };
    this.props.SUBMIT(
      userData
      // loading: false,
      // error: {},
    );
    console.log(userData);

    //Rest
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    //console.log(this.setState);
  };
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    console.log("form", formData);
    console.log(image.name);

    //this.props.uploadImage(formData);
    //send rest
  };
  handleEditPicture = (event) => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  render() {
    const { classes } = this.props;
    const { user } = this.state;
    console.log("Hello props");

     console.log(this.props);

    //console.log(this.props.DataProfile.fullName);

    return (
      <div>
        <BarProfile />
        <ProfileContainer container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <div className="contain-avatar" data-test-id="profile-avatar">
              <h3 className="text-avatar">Avatar</h3>
              <div className="contain-picture-avatar">
                <div
                  className="MrFeHFqEkuBP9W name-picture"
                  title="Mark Latthapol (marklatthapol)"
                >
                  <span
                    className="namePicture"
                    style={{
                      fontSize: "48px",
                      height: "100px",
                      width: "100px",
                      lineHeight: "100px",
                    }}
                  >
                    {this.state.initials}
                  </span>
                </div>
                <div className="inputPicture">
                  <input
                    className="testButton"
                    onClick={() => {
                      console.log("555");
                    }}
                    type="file"
                    id="imageInput"
                    onChange={this.handleImageChange}
                    hidden="hidden"
                  />
                  <Tooltip title="Edit Profile Picture" placement="bottom">
                    <IconButton
                      onClick={this.handleEditPicture}
                      className="button"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <Typography variant="h3" className={classes.pageTitle}>
              <p className="font-profile">Profile</p>
              <hr width="60%" />
            </Typography>

            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="full-name"
                name="fullName"
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
                name="userName"
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
                onClick={(event) => {
                  this.handleSubmit(event);
                }}
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

const mapStateToProps = (state) => {
  return {
    DataProfile: state.DataProfile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SUBMIT: (state) => {
      dispatch({
        type: "SUBMIT",
        state,
      });
    },
  };
};
const ProfileContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: visible;
  float: left;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(profile));