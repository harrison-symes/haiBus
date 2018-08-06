
export default function busses (state = {}, action) {
  const newState = {...state}
  switch(action.type) {
    case 'RECEIVE_BUSSES':
      newState[action.service] = action.busses
      return newState
    default: return state
  }
}
