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
import axios from "axios";

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
      picture: "",
      pictureName: "",
    };
  }

  //Get user data
  componentDidMount() {
    const authenHeader = this.props.authenHeader;
    console.log(this.props);

    if (authenHeader !== null) {
      axios
        .get(
          "https://boxing-donair-89223.herokuapp.com/profile/my_profile/",
          authenHeader
        )
        .then((res) => {
          const member = res.data;
          for (var x in member) {
            if (member[x] === "null") {
              member[x] = "";
            }
          }
          this.setState({
            id: member.id,
            fullName: member.fullname,
            initials: member.init,
            userName: member.username,
            bio: member.bio,
            picture: member.picture,
          });
        });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const authenHeader = this.props.authenHeader;

    const userData = {
      new_fullname: this.state.fullName,
      init: this.state.initials,
      bio: this.state.bio,
      picture: this.state.picture,
    };
    const formData = new FormData();
    formData.append("new_fullname", this.state.fullName);
    formData.append("init", this.state.initials);
    formData.append("bio", this.state.bio);
    formData.append("picture", this.state.picture);
    this.props.SUBMIT(userData);
    console.log("userData", userData);

    //Rest post
    if (authenHeader !== null) {
      axios
        .patch(
          "https://boxing-donair-89223.herokuapp.com/profile/my_profile/",
          formData,
          authenHeader
        )
        .then((res) => {
          console.log("patch", userData);
          console.log(res);
        });
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.setState({
      picture: image,
      pictureName: image.name,
    });
    //console.log("img2", image.name);
  };
  handleEditPicture = (event) => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  PictureOrInit = (state) => {
    return this.state.picture ? (
      <div className="">
        <img
          className="namePicture"
          src={"https://boxing-donair-89223.herokuapp.com" + this.state.picture}
          alt=""
          style={{
            width: "100%",
            maxWidth: "100px",
            maxHeight: "100px",
            height: "fit-content",
          }}
        />
      </div>
    ) : (
      <div>
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
    );
  };
  render() {
    const { classes } = this.props;
    const { user } = this.state;
    console.log("user", this.state);

    return (
      <div>
        <BarProfile data={this.state} />
        <ProfileContainer container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <div className="contain-avatar" data-test-id="profile-avatar">
              <h3 className="text-avatar">Avatar</h3>
              <div className="contain-picture-avatar">
                <div className="" title={this.state.pictureName}>
                  {this.PictureOrInit()}
                </div>
                <div className="inputPicture">
                  <input
                    className="testButton"
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
    DataProfile: state.dataProfile,
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
