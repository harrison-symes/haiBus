import {get, set} from '../utils/localstorage'

const init = JSON.parse(get('services')) || []

export default function (state = init, action) {
  let newState = [...state]
  switch(action.type) {
    case 'ADD_SERVICE':
      if (isNaN(action.service)) return state
      newState.push(action.service)
      set('services', JSON.stringify(newState))
      return newState
    case 'REMOVE_SERVICE':
      newState = newState.filter(service => service != action.service)
      set('services', JSON.stringify(newState))
      return newState
    default: return state
  }
}
