const futureSetClassReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return action.payload;
    default:
      return state;
  }
};

export default futureSetClassReducer;
