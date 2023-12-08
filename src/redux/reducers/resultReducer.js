import { ADD_RESULT } from "../actions";

const initialState = {
  vehicles: []
};
const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        vehicles: [...action.payload]
      };
    default:
      return state;
  }
};
export default resultReducer;
