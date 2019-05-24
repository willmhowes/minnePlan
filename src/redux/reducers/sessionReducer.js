const sessionReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_SESSIONS':
      return action.payload;
    default:
      return state;
  }
};

export default sessionReducer;
