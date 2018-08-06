import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import BusMap from './BusMap'

const App = ({auth}) => (
  <Router>
    <React.Fragment>
        <h1 className="title is-1 has-text-centered">Hai-Bus</h1>
      <BusMap />
    </React.Fragment>
  </Router>
)

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(App)
