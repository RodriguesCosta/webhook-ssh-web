import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from './pages/HomePage'
import Error404 from './pages/Error404'
import Login from './pages/Login';

import "tabler-react/dist/Tabler.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dash" component={HomePage} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
