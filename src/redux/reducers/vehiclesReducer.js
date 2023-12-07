import { ADD_VEHICLE } from "../actions";

const initialState = {
  vehicle: null
};
const vehiclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      return {
        ...state,
        vehicle: action.payload
      };
    default:
      return state;
  }
};
export default vehiclesReducer;
