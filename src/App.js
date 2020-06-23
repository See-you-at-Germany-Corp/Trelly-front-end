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

import CreateNewBoard from './components/createNewBoard';
import BoardDetail from './pages/board-detail';

function App() {
  return (
    <Router>

      <div style={{ background: 'rgb(2, 106, 167)', height: '5.5vh', width: '100%', position: 'sticky', top: '0', zIndex: '1' }}></div>
      <CreateNewBoard />

      <Switch>
        <Route path='/login/' component={Login} />

        <Route path='/signup/' component={Signup} />

        <Route path='/forgot/' component={Forgot} />

        <Route exact path='/:boardId/:boardName' component={BoardDetail} />

        <Route exact path='/' component={Home} />

      </Switch>

    </Router>
  );
}

export default App;
