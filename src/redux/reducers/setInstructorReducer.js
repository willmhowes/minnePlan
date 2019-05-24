const setInstructorReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_INSTRUCTOR':
      return action.payload;
    default:
      return state;
  }
};

export default setInstructorReducer;
