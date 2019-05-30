const yearReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_YEARS':
      return action.payload;
    default:
      return state;
  }
};

export default yearReducer;
