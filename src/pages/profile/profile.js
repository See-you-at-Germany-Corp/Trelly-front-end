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
import { URL } from '../../api/index.js';

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
    this.state = {};
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const authenHeader = this.props.authenHeader;

    const formData = new FormData();
    formData.append("new_fullname", this.state.fullname);
    formData.append("init", this.state.init);
    formData.append("bio", this.state.bio);
    if (typeof (this.state.picture) !== typeof '')
      formData.append("picture", this.state.picture);
    this.props.SUBMIT(this.state); 

    //Rest post
    if (authenHeader !== null) {
      axios
        .patch(
          "https://boxing-donair-89223.herokuapp.com/profile/my_profile/",
          formData,
          authenHeader
        )
        .then((res) => {
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
    event.preventDefault();
    let reader = new FileReader();
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    reader.onloadend = () => {
      this.setState({
        picture: image,
        pictureName: image.name,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(image);
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

  componentDidMount() {
    const authenHeader = this.props.authenHeader;
    axios.get(`${URL}/profile/my_profile/`, authenHeader)
      .then((res) => {
        const state = res.data;
        this.props.SUBMIT(state);
        this.setState({ ...state });
      });
    this.setState({ ...this.props.DataProfile });
  }

  render() {
    const { classes } = this.props;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          className = "namePicture"
          src={imagePreviewUrl}
          style={{
            width: "100%",
            maxWidth: "100px",
            maxHeight: "100px",
            height: "fit-content",
          }}
        />
      );
    } else {
      // $imagePreview = (
      //   <div className="previewText">Please select an Image for Preview</div>
      // );
    }
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
                  <div className="imgPreview">{$imagePreview}</div>
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
                name="fullname"
                type="text"
                label="full-name"
                className={classes.TextField}
                value={this.state.fullname}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="initials"
                name="init"
                type="text"
                label="initials"
                className={classes.TextField}
                value={this.state.init}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="username"
                name="username"
                type="text"
                label="username"
                className={classes.TextField}
                value={this.state.username}
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
