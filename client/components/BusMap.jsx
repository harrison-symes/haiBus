import React from 'react'
import {connect} from 'react-redux'

import {getBusses, getStops} from '../actions/bus'

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
    this.stops = []
    this.interval = null
  }
  getServices() {
    const {dispatch, services} = this.props
    services.map(service => {
      dispatch(getBusses(service))
      dispatch(getStops(service))
    })
  }
  componentDidMount() {
    this.getServices()
    this.loadMap(defaultCenter)
    this.interval = window.setInterval(() => this.getServices(), 10000)
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.services).length != Object.keys(nextProps.services).length) {
      this.getServices()
    }
    // if (Object.keys(this.props.stops).length != Object.keys(nextProps.stops).length) this.getServices()
    this.loadMarkers(nextProps)
  }
  busMarkers(props) {
    const {busses, isInbound} = props || this.props
    this.markers.forEach(marker => {
      marker.setMap(null)
      marker.setVisible(false)
    })
    this.markers = Object.keys(busses).reduce((acc, key) => {
      const markers = busses[key]
      .filter(bus => bus.Direction == (isInbound ? 'Inbound' : 'Outbound'))
      .map(bus => {
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
  }
  stopMarkers(props) {
    const {isInbound, stops} = props || this.props
    console.log({stops});
    this.stops.forEach(marker => {
      marker.setMap(null)
      marker.setVisible(false)
    })
    this.stops = Object.keys(stops).reduce((acc, key) => {
      const markers = stops[key][isInbound ? 'IN' : 'OUT']
      .map(stop => {
        console.log({stop});
        return new google.maps.Marker({
          position: {
            lat: Number(stop.lat),
            lng: Number(stop.lng)
          },
          title: stop.stopNumber,
          onclick: () => console.log("hello"),
          icon: {
            url: `/images/${key}.png`,
            scaledSize: new google.maps.Size(10, 10)
          },
          map: this.map
        })
      })
      return acc.concat(markers)
    }, [])
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
    this.busMarkers(props)
    this.stopMarkers(props)
  }
  render() {
    console.log(this.props.busses);
    const {width, height} = this.state
    return <div className="">
      <div style={{height, width, margin: 'auto'}} ref="map" >I should be a map!</div>
    </div>
  }
}

const mapStateToProps = ({
  busses,
  isInbound,
  services,
  stops
}) => ({
  busses,
  isInbound,
  services,
  stops
})

export default connect(mapStateToProps)(BusMap)
