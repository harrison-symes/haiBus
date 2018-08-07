export default function (state = {}, action) {
  const newState = {...state}
  switch(action.type) {
    case 'RECEIVE_STOPS':
      newState[action.service] = action.stops
      return newState
    case 'REMOVE_SERVICE':
      delete newState[action.service]
      return newState
    default: return state
  }
}
