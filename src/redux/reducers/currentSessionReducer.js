const currentSessionReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_CURRENT_SESSIONS':
      return action.payload;
    default:
      return state;
  }
};

export default currentSessionReducer;
