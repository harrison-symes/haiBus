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
