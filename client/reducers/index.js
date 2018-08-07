import {combineReducers} from 'redux'

import socket from './socket'
import busses from './busses'
import isInbound from './isInbound'
import services from './services'
import stops from './stops'

export default combineReducers({
  socket,
  busses,
  isInbound,
  services,
  stops
})
