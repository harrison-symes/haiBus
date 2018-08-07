export default function (state = null, action) {
  switch(action.type) {
    case 'SELECT_STOP':
      return action.stop
    default: return state
  }
}
