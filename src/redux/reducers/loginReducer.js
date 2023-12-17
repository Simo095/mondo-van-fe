import { ADD_MY_FRIENDS, ADD_ROLE, ADD_TOKEN, ADD_USER } from "../actions";
const initialState = {
  token: "",
  role: "",
  user: null,
  friends: []
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case ADD_ROLE:
      return {
        ...state,
        role: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case ADD_MY_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    //aggiungi i vari casi di login e come salvare il token per averlo disponibile ovunque e comunque per le richiesta al backend
    default:
      return state;
  }
};
export default loginReducer;
