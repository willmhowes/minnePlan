const seasonReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_SEASONS':
      return action.payload;
    default:
      return state;
  }
};

export default seasonReducer;
