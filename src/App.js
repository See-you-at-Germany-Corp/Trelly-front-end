import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

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
  return (
    <Router>
      <Navbar />
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
