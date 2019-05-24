const instructorScheduleReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_INSTRUCTOR_SCHEDULE':
      return action.payload;
    default:
      return state;
  }
};

export default instructorScheduleReducer;
