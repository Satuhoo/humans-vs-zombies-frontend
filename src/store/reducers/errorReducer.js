const initialState = {
  error: false
}

const errorReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'KILL_ERROR':
      return {
        error: true
      }
    case 'RESET_ERRORS':
      return {
        error: false
      }
    default:
      return state
  }
}

export default errorReducer