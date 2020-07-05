import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';


import Home from "./pages/home";
import Login from "./pages/user-account/login";
import Signup from "./pages/user-account/signup";
import Forgot from "./pages/user-account/forgot";
import Navbar from "./components/navbar/navbar";
import Profile from "./pages/profile/profile";

import CreateNewBoard from "./components/createNewBoard";
import BoardDetail from "./pages/board-detail";

import { BoardProvider } from "./context/board-context/board-context";
import { useAuthen } from "./api/index";
function App(props) {
  const authenHeader = useAuthen();
  useEffect(()=>{
    if (authenHeader !== null) {
      axios
        .get(
          "https://boxing-donair-89223.herokuapp.com/profile/my_profile/",
          authenHeader
        )
        .then((res) => {
          const member = res.data;
          props.dispatch({type:"SET_DATA",state:{
            fullName: member.fullname,
            initials: member.init,
            userName: member.username,
            bio: member.bio,
            picture: member.picture,
          }})
        });
    }
  })
  return (
    <Router>
      {props.loggedIn ?
      <Navbar />:null
      }
      <CreateNewBoard />

      <BoardProvider>
        {
          /// check loggedIn.
          /// if true -> render user flow.
          /// else -> render guest flow.
          props.loggedIn ? (
            <Switch>
              <Route path="/login/" component={Login} />

              <Route path="/signup/" component={Signup} />

              <Route path="/forgot/" component={Forgot} />

              <Route path="/profile/" >
                <Profile authenHeader = {authenHeader}></Profile>
              </Route>

              <Route
                exact
                path="/:boardId/:boardName"
                component={BoardDetail}
              />

              <Route exact path="/" component={Home} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/login/" component={Login} />

              <Route exact path="/signup/" component={Signup} />

              <Route exact path="/forgot/" component={Forgot} />

              <Redirect to="/login/" />
            </Switch>
          )
        }
      </BoardProvider>
    </Router>
  );
}

const mapStateWithProps = (state) => ({
  loggedIn: state.loggedIn.loggedIn,
});

const AppWithConnect = connect(mapStateWithProps)(App);

export default AppWithConnect;
