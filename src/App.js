import React from "react";
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
import { URL, useAuthen } from "./api";

function App(props) {
  const authenHeader = useAuthen();

  React.useMemo(() => {
    if (authenHeader !== null) {
      axios.get(`${URL}/profile/my_profile/`, authenHeader)
        .then((res) => {
          const state = res.data;
          props.dispatch({ type: "SUBMIT", state })
        });
    }
  })

  return (
    <Router>
      {
        props.loggedIn &&
        <Navbar />
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
                <Profile authenHeader={authenHeader}></Profile>
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
