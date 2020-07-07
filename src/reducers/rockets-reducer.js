const rockets = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ROCKETS':
      return { ...state, loading: true };
    case 'ROCKETS_RECEIVED':
      console.log('this is action ', action)
      return { ...state, rockets: action.json, loading: false }
    default:
      return state;
  }
};
export default rockets;