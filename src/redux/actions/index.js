export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_USER = "ADD_USER";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const ADD_RESULT = "ADD_RESULT";
export const LOGGED = "LOGGED";
export const ADD_STARTDATE = "ADD_STARTDATE";
export const ADD_ENDDATE = "ADD_ENDDATE";
export const ADD_POSTS = "ADD_POSTS";
export const addToken = token => ({ type: ADD_TOKEN, payload: token });
export const addRole = role => ({ type: ADD_ROLE, payload: role });
export const addUser = user => ({ type: ADD_USER, payload: user });
export const addVehicle = vehicle => ({ type: ADD_VEHICLE, payload: vehicle });
export const addResult = arrayVehicle => ({ type: ADD_RESULT, payload: arrayVehicle });
export const logged = condition => ({ type: LOGGED, payload: condition });
export const startDate = startDate => ({ type: ADD_STARTDATE, payload: startDate });
export const endDate = endDate => ({ type: ADD_ENDDATE, payload: endDate });
export const addPosts = data => ({ type: ADD_POSTS, payload: data });

export const fetchPost = token => {
  return async dispatch => {
    try {
      const risp = await fetch("http://localhost:8080/posts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(addPosts(data.content));
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
};
