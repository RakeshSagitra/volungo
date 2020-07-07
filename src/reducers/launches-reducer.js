const launches = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LAUNCHES':
      return { ...state, loading: true }
    case 'LAUNCHES_RECEIVED':
      return { ...state, launches: action.payload, loading: false }
    default:
      return state
  }
}
export default launches