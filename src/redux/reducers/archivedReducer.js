// Expect once reducer is set, it will have class information for sessions based on season and year
const archived = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARCHIVED':
      return action.payload;
    default:
      return state;
  }
};

export default archived;
