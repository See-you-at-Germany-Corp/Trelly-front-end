import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from 'react-router-dom'
//MUI stuff
import Button from "@material-ui/core/Button";
import Multilink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Lick';
import CalendarToday from '@material-ui/icons/CalendarToday';
//Redux
import {connect} from 'react-redux';
const styles = (theme) => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  });

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { fullName, initial, userName, bio, imageUrl },
        loading,
        authenticated
      },
    } = this.props;

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className = {classes.paper}>
            <div className = {classes.profile}>
                <div className = "profile-image">
                    <img src="{imageUrl}" alt="profile"/>
                </div>
                <hr/>
                 <div className="profile-details">
        <Multilink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
        </Multilink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span>
                        <hr/>
                        </Fragment>
                    )}
                    
                 </div>
            </div>
        </Paper>
    ):(
        <Paper className={classes.paper}>
            <Typography variant = "body2" align="center">
            No profile found, please login again </Typography>
            <div className = {classes.buttons}>
                <Button variant = "contained" color="primary" component={Link} to="/login">
                    Login
                </Button>
                <Button variant = "contained" color="primary" component={Link} to="/signup">
                    Signup
                </Button>
            </div>
        </Paper>
    )) : (<p>loading...</p>)
    return profileMarkup;
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.prototype = {
  user: PropTypes.object.isREquired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
