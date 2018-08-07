export default function (state = 'true', action) {
  console.log({action});
  switch(action.type){
    case 'FLIP_DIRECTION':
    console.log({action});
      return !state
    default: return state
  }
}
