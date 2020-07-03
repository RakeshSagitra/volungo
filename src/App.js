import React from 'react';
import './App.css';

import History from './components/History/History'
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Launches from './components/Launches/Launches';

function App(props) {

  // return (
  //   <div className="App">
  //     {/* <History></History> */}
  //     <Launches></Launches>
  //   </div>
  // );
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/launches">Launches</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <div>
              Please select a route
            </div>
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/launches">
            <Launches />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
