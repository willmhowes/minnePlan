const classCountReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_CLASS_COUNT':
      return action.payload;
    default:
      return state;
  }
};

export default classCountReducer;
