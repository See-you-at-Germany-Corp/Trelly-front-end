import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import profile from "./pages/profile/profile";
import card from "./pages/card/card"

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Container">
          <Switch>
            {/* <Route exact path="/" component={profile} /> */}
            {/* <Route exact path="/marklatthapol/activity" component={profile} /> */}
            <Route exact path="/" component={card} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
