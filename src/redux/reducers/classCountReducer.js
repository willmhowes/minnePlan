// expect instructor class count
const classCountReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLASS_COUNT':
      return action.payload;
    default:
      return state;
  }
};

export default classCountReducer;
