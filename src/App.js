import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';

import CreateNewBoard from './components/createNewBoard';

function App() {
  return (
    <Router>

      <div style={{ background: 'rgb(2, 106, 167)', height: '5.5vh', width: '100%', position: 'sticky', top: '0', zIndex: '1' }}></div>
      <CreateNewBoard />

      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/login'>
          <Login />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
