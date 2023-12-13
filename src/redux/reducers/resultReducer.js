import { ADD_ENDDATE, ADD_RESULT, ADD_STARTDATE, LOGGED } from "../actions";

const initialState = {
  vehicles: [],
  logged: false,
  startDate: null,
  endDate: null
};
const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        vehicles: [...action.payload]
      };
    case LOGGED:
      return {
        ...state,
        logged: action.payload
      };
    case ADD_STARTDATE:
      return {
        ...state,
        startDate: action.payload
      };
    case ADD_ENDDATE:
      return {
        ...state,
        endDate: action.payload
      };
    default:
      return state;
  }
};
export default resultReducer;