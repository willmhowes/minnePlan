const futureSetClassReducer = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_CLASSES':
      return action.payload;
    default:
      return state;
  }
};

export default futureSetClassReducer;
