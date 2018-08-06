import React from 'react'
import {connect} from 'react-redux'

import {getBusses} from '../actions/bus'

const defaultCenter = {
  lat: -41.300637,
  lng: 174.801782
}

class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        height: '50vh',
        width: '50vw'
    }
  }
  componentDidMount () {
    this.loadMap(defaultCenter)
  }
  loadMap (center) {
    console.log({center});
    this.map = new google.maps.Map(this.refs.map, {
      center,
      zoom: 16
    })
    console.log(this.map);
    this.marker = new google.maps.Marker({
      position: center,
      map: this.map
    })
  }

  render () {
    let {height, width} = this.state
    return (
        <div style={{height, width}} ref="map" >I should be a map!</div>
    )}
  }

class BusMap extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.dispatch(getBusses(14))
    this.props.dispatch(getBusses(35))
    this.props.dispatch(getBusses(2))
  }
  render() {
    console.log(this.props.busses);
    return <div className="container">
      Bus Map Here
      <div className="columns column is-6 is-offset-3">
        <Map />
      </div>

    </div>
  }
}

const mapStateToProps = ({busses}) => ({busses})

export default connect(mapStateToProps)(BusMap)
