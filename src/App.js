import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/home';
import { Login } from './pages/user-account/login';

function App() {
  return (
    <Router>
      <Switch>

        {/* <Route path='/login/' component={} /> */}

        <Route exact path='/'>
          {/* <Home /> */}
          <Login />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;
