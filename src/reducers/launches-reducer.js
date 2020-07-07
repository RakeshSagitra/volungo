const launches = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LAUNCHES':
      return { ...state, loading: true };
    case 'LAUNCHES_RECEIVED':
      console.log('this is action ', action)
      return { ...state, launches: action.json, loading: false }
    default:
      return state;
  }
};
export default launches;