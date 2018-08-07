import React from 'react'
import {connect} from 'react-redux'

import {Map, Marker} from 'google-maps-react';
import {GoogleApiWrapper} from 'google-maps-react';

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
    // this.loadMap(defaultCenter)
    this.interval = window.setInterval(() => this.getServices(), 10000)
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.services).length != Object.keys(nextProps.services).length) {
      this.getServices()
    }
    // if (Object.keys(this.props.stops).length != Object.keys(nextProps.stops).length) this.getServices()
    // this.loadMarkers(nextProps)
  }
  busMarkers(props) {
    const {busses, isInbound} = props || this.props
    return Object.keys(busses).reduce((acc, key) => {
      const markers = busses[key]
      .filter(bus => bus.Direction == (isInbound ? 'Inbound' : 'Outbound'))
      .map(bus => <Marker
        title={"BUS"}
        name={bus}
        position={{
          lat: Number(bus.Lat),
          lng: Number(bus.Long)
        }}
        icon={{
          url: `/images/${key}.png`,
          scaledSize: new google.maps.Size(30, 30)
        }}>
      </Marker>)
      return acc.concat(markers)
    }, [])
  }
  mapClick(mapProps, map, clickEvent) {
    console.log({clickEvent, mapProps});
  }
  stopMarkers(props) {
    const {isInbound, stops} = props || this.props
    console.log({stops});
    const rStops =  Object.keys(stops).reduce((acc, key) => {
      const markers = stops[key][isInbound ? 'IN' : 'OUT']
      .map(stop => <Marker
        title={"BUS"}
        position={{
          lat: Number(stop.lat),
          lng: Number(stop.lng)
        }}
        title={stop.stopNumber}
        name={stop.stopNumber}
        icon={{
          url: `/images/${key}.png`,
          scaledSize: new google.maps.Size(10, 10)
        }}
      >
      </Marker>)
      return acc.concat(markers)
    }, [])
    console.log({rStops});
  }
  render() {
    console.log(this.props.busses);
    const {width, height} = this.state
    return <Map google={window.google}
      style={{height: '100%', width: '100%', margin: 'none', left: 0, position: 'absolute'}}
      zoom={17}
      initialCenter={{
          lat: -41.300637,
          lng: 174.801782
      }}
      centerAroundCurrentLocation={false}
      onClick={this.mapClick.bind(this)}
      >
        {/* {this.busMarkers()} */}
        {this.stopMarkers()}
    </Map>
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
