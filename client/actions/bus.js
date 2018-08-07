import request from 'superagent'

export function receiveBusses (service, busses) {
  console.log({busses});
  return {
    type: 'RECEIVE_BUSSES',
    service,
    busses
  }
}

export function getBusses (service) {
  return dispatch => {
    request
      .get('/api/bus/' + service)
      .then(res => {
        dispatch(receiveBusses(service, res.body))
      })
      .catch(err => console.log({err}))
  }
}

export function receiveStops (service, stops) {
  console.log({service, stops});
  return {
    type: 'RECEIVE_STOPS',
    service,
    stops
  }
}

export function getStops (service) {
  return dispatch => {
    request
      .get(`/api/bus/${service}/stops`)
      .then(res => {
        dispatch(receiveStops(service, res.body))
      })
      .catch(err => console.log(err))
  }
}
