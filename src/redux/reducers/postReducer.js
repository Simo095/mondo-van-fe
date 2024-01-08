import {
  ADD_MY_POSTS,
  ADD_POSTS,
  ADD_POSTS_EM,
  ADD_POSTS_HOME,
  ADD_POST_USER_VISIT,
  ADD_USER_VISIT,
  ADD_VEHICLE_VISIT,
  MODIFY_CATEGORY,
  RESET_POST,
  STRING_CATEGORY
} from "../actions";

const initialState = {
  data: [],
  home: [],
  em: [],
  myPost: [],
  visitUser: null,
  visitVehicle: null,
  postUserVisit: null,
  categoryString: "",
  category: false
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        data: action.payload
      };
    case ADD_USER_VISIT:
      return {
        ...state,
        visitUser: action.payload
      };
    case ADD_VEHICLE_VISIT:
      return {
        ...state,
        visitVehicle: action.payload
      };
    case ADD_POST_USER_VISIT:
      return {
        ...state,
        postUserVisit: action.payload
      };
    case ADD_POSTS_HOME:
      return {
        ...state,
        home: action.payload
      };
    case ADD_MY_POSTS:
      return {
        ...state,
        myPost: action.payload
      };
    case ADD_POSTS_EM:
      return {
        ...state,
        em: action.payload
      };
    case MODIFY_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case STRING_CATEGORY:
      return {
        ...state,
        categoryString: action.payload
      };
    case RESET_POST:
      return {
        data: [],
        home: [],
        em: [],
        myPost: [],
        visitUser: null,
        visitVehicle: null,
        postUserVisit: null
      };
    default:
      return state;
  }
};

export default postReducers;
