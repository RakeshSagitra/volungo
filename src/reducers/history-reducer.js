const history = (state = {}, action) => {
  switch (action.type) {
    case 'GET_HISTORY':
      console.log('this is action ', action)
      return { ...state, loading: true };
    case 'HISTORY_RECEIVED':
      console.log('this is action ', action)
      return { ...state, history: action.json, loading: false }
    default:
      return state;
  }
};
export default history;