import { ADD_MY_POSTS, ADD_POSTS, ADD_POSTS_EM, ADD_POSTS_HOME } from "../actions";

const initialState = {
  data: [],
  home: [],
  em: [],
  myPost: []
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        data: action.payload
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
    default:
      return state;
  }
};

export default postReducers;
