import {combineReducers} from 'redux'

import socket from './socket'
import busses from './busses'

export default combineReducers({
  socket,
  busses
})
