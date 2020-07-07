import React, { useState } from 'react'
import './App.css'

import History from './components/History/History'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Launches from './components/Launches/Launches'

function App(props) {
  const [active, setActive] = useState([])
  function toggleActive(value) {
    setActive(value)
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/history" className={active === 'history' ? 'active' : null} onClick={(event) => {
              toggleActive('history')
            }}>History</Link>
          </li>
          <li>
            <Link to="/launches" className={active === 'launches' ? 'active' : null} onClick={(event) => {
              toggleActive('launches')
            }}>Launches</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <div>
              <h3>Please select a route</h3>
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
  )
}

export default App
