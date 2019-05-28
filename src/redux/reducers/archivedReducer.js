const archived = (state = [], action) => {
  // console.log(action.type);
  switch (action.type) {
    case 'SET_ARCHVED':
      return action.payload;
    default:
      return state;
  }
};

export default archived;
