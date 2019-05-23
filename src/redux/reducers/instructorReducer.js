const instructorReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_INSTRUCTORS':
      return action.payload;
    default:
      return state;
  }
};

export default instructorReducer;
