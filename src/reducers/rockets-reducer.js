const rockets = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ROCKETS':
      return { ...state, loading: true }
    case 'ROCKETS_RECEIVED':
      return { ...state, rockets: action.payload, loading: false }
    default:
      return state
  }
}
export default rockets