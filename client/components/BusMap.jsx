import React from 'react'
import {connect} from 'react-redux'

const defaultCenter = {
  lat: -45.8764,
  lng: 170.5036
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
      zoom: 17
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
  render() {

    return <div className="container">
      Bus Map Here
      <div className="columns column is-6 is-offset-3">
        <Map />
      </div>

    </div>
  }
}

export default connect()(BusMap)
