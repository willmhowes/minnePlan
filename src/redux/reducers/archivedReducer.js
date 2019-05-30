const archived = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_ARCHIVED':
      return action.payload;
    default:
      return state;
  }
};

export default archived;
