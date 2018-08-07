import React from 'react'
import {connect} from 'react-redux'

import {getBusses} from '../actions/bus'

const defaultCenter = {
  lat: -41.300637,
  lng: 174.801782
}

class BusMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        height: '80vh',
        width: '80vw'
    }
    this.markers = []
    this.home = []
    this.interval = null
  }
  getServices() {
    const {dispatch, services} = this.props
    services.map(service => dispatch(getBusses(service)))
  }
  componentDidMount() {
    this.getServices()
    this.loadMap(defaultCenter)
    this.interval = window.setInterval(() => this.getServices(), 10000)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.services.length != nextProps.services.length) {
      this.getServices()
    }
    this.loadMarkers(nextProps)
  }
  loadMap (center) {
    console.log({center});
    this.map = new google.maps.Map(this.refs.map, {
      center,
      zoom: 14
    })
    console.log(this.map);
    this.home = new google.maps.Marker({
      position: center,
      map: this.map
    })
    this.loadMarkers()
  }
  loadMarkers(props) {
    const {busses, isInbound} = props || this.props
    this.markers.forEach(marker => {
      marker.setMap(null)
      marker.setVisible(false)
    })
    this.markers = Object.keys(busses).reduce((acc, key) => {
      const markers = busses[key]
      .filter(bus => bus.Direction == (isInbound ? 'Inbound' : 'Outbound'))
      .map(bus => {
        console.log({bus});
        return new google.maps.Marker({
          position: {
            lat: Number(bus.Lat),
            lng: Number(bus.Long)
          },
          map: this.map,
          icon: {
            url: `/images/${key}.png`,
            scaledSize: new google.maps.Size(30, 30)
          },
        })
      })
      return acc.concat(markers)
    }, [])
    // this.markers = new google.maps.Marker({
    //   position: center,
    //   map: this.map
    // })
  }
  render() {
    console.log(this.props.busses);
    const {width, height} = this.state
    return <div className="">
      <div style={{height, width, margin: 'auto'}} ref="map" >I should be a map!</div>
    </div>
  }
}

const mapStateToProps = ({busses, isInbound, services}) => ({busses, isInbound, services})

export default connect(mapStateToProps)(BusMap)
