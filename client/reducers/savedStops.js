import {get, set} from '../utils/localstorage'

const init = JSON.parse(get('savedStops')) || []

export default function (state = init, action) {
  let newState = [...state]
  switch(action.type) {
    case 'SAVE_STOP':
      if (newState.find(stop => stop == action.stop))
      newState = newState.filter(stop => stop != action.stop)
      else newState.push(action.stop)
      set(JSON.stringify(newState))
      return newState
    default: return state
  }
}
