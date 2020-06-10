import React from 'react';  
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/home';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path='/'>
          <Navbar />
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
