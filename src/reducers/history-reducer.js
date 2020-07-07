const history = (state = {}, action) => {
  switch (action.type) {
    case 'GET_HISTORY':
      return { ...state, loading: true }
    case 'HISTORY_RECEIVED':
      return { ...state, history: action.payload, loading: false }
    default:
      return state
  }
}
export default history