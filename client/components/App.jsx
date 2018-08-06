import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import BusMap from './BusMap'

const App = ({auth}) => (
  <Router>
    <div className="container has-text-centered">
      <div className="hero is-small is-primary">
        <div className="hero-body has-text-centered">
          <Link to='/' className="">
            <h1 className="title is-1">Sock-Off</h1>
          </Link>
          <BusMap />
        </div>
      </div>
    </div>
  </Router>
)

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(App)
