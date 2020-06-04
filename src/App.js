import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/home'
import Login from './pages/user-account/login'
import Signup from './pages/user-account/signup'
import Forgot from './pages/user-account/forgot'

function App() {
  return (
    <Router>
      <Switch>

        <Route path='/login/' component={Login} />
        <Route path='/signup/' component={Signup} />
        <Route path='/forgot/' component={Forgot} />

        <Route exact path='/'>
          <Home />
          {/* <Signup /> */}
        </Route>


      </Switch>
    </Router>
  );
}

export default App;
