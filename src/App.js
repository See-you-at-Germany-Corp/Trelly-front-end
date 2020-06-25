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
import Navbar from './components/navbar/navbar'

import CreateNewBoard from './components/createNewBoard';
import BoardDetail from './pages/board-detail';

import { BoardProvider } from './context/board-context/board-context'

function App() {
  return (
    <Router>
      <Navbar />
      <CreateNewBoard />

      <BoardProvider>
        <Switch>
          <Route path='/login/' component={Login} />

          <Route path='/signup/' component={Signup} />

          <Route path='/forgot/' component={Forgot} />

          <Route exact path='/:boardId/:boardName' component={BoardDetail} />

          <Route exact path='/' component={Home} />

        </Switch>
      </BoardProvider>

    </Router>
  );
}

export default App;
