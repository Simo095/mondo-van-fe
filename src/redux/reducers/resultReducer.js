import {
  ADD_ENDDATE,
  ADD_RESULT,
  ADD_STARTDATE,
  BEDS,
  LOGGED,
  PRICE,
  PROVINCE,
  RESET_RESULT,
  VEHICLE_CUSTOMER_PROFILE
} from "../actions";

const initialState = {
  vehicles: [],
  logged: false,
  startDate: null,
  endDate: null,
  price: null,
  province: "",
  beds: "",
  vehicleCustomerProfile: []
};
const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        vehicles: action.payload
      };
    case VEHICLE_CUSTOMER_PROFILE:
      return {
        ...state,
        vehicleCustomerProfile: [...action.payload]
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
    case PROVINCE:
      return {
        ...state,
        province: action.payload
      };
    case BEDS:
      return {
        ...state,
        beds: action.payload
      };
    case PRICE:
      return {
        ...state,
        price: action.payload
      };
    case RESET_RESULT:
      return {
        vehicles: [],
        logged: false,
        startDate: null,
        endDate: null,
        price: null,
        province: "",
        beds: "",
        vehicleCustomerProfile: []
      };
    default:
      return state;
  }
};
export default resultReducer;
