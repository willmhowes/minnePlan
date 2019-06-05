const currentSessionReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_SESSIONS':
      return action.payload;
    default:
      return state;
  }
};

export default currentSessionReducer;
