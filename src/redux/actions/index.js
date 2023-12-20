export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_USER = "ADD_USER";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const ADD_RESULT = "ADD_RESULT";
export const LOGGED = "LOGGED";
export const ADD_STARTDATE = "ADD_STARTDATE";
export const ADD_ENDDATE = "ADD_ENDDATE";
export const ADD_POSTS = "ADD_POSTS";
export const ADD_POSTS_HOME = "ADD_POSTS_HOME";
export const ADD_POSTS_EM = "ADD_POSTS_EM";
export const ADD_MY_POSTS = "ADD_MY_POSTS";
export const ADD_EVENT_CALENDAR = "ADD_EVENT_CALENDAR";
export const ADD_ARRAY_CALENDAR = "ADD_ARRAY_CALENDAR";
export const VEHICLE_CUSTOMER_PROFILE = "VEHICLE_CUSTOMER_PROFILE";
export const PROVINCE = "PROVINCE";
export const BEDS = "BEDS";
export const PRICE = "PRICE";

export const addToken = token => ({ type: ADD_TOKEN, payload: token });
export const addRole = role => ({ type: ADD_ROLE, payload: role });
export const addUser = user => ({ type: ADD_USER, payload: user });
export const addVehicle = vehicle => ({ type: ADD_VEHICLE, payload: vehicle });
export const addResult = arrayVehicle => ({ type: ADD_RESULT, payload: arrayVehicle });
export const addProvince = province => ({ type: PROVINCE, payload: province });
export const addPrice = price => ({ type: PRICE, payload: price });
export const addBeds = beds => ({ type: BEDS, payload: beds });
export const addStartDate = startDate => ({ type: ADD_STARTDATE, payload: startDate });
export const addEndDate = endDate => ({ type: ADD_ENDDATE, payload: endDate });
export const logged = condition => ({ type: LOGGED, payload: condition });
export const addPosts = posts => ({ type: ADD_POSTS, payload: posts });
export const addPostsHome = posts => ({ type: ADD_POSTS_HOME, payload: posts });
export const addPostsEmiliaRomagna = postsEM => ({ type: ADD_POSTS_EM, payload: postsEM });
export const addMyPosts = myPosts => ({ type: ADD_MY_POSTS, payload: myPosts });
export const addEventCalendar = data => ({ type: ADD_EVENT_CALENDAR, payload: data });
export const addArrayCalendar = data => ({ type: ADD_ARRAY_CALENDAR, payload: data });
export const addVehicleCustomerProfile = data => ({ type: VEHICLE_CUSTOMER_PROFILE, payload: data });

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
export const fetchMyPost = token => {
  return async dispatch => {
    try {
      const risp = await fetch("http://localhost:8080/posts/my_post", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(addMyPosts(data.content));
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
};

export const fetchPostHome = () => {
  return async dispatch => {
    try {
      const risp = await fetch("http://localhost:8080/sign_in/home", {
        method: "GET"
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(addPostsHome(data.content));
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
};
export const fetchPostHomeEmiliaRomagna = () => {
  return async dispatch => {
    try {
      const risp = await fetch("https://emiliaromagnaturismo.it/opendata/v1/itineraries?limit=6&time=48'", {
        method: "GET"
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(addPostsEmiliaRomagna(data.data));
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
};
export const fetchDeletePost = (token, postId) => {
  return async dispatch => {
    try {
      const resp = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (resp.ok) {
        dispatch(fetchMyPost(token));
        dispatch(fetchPost(token));
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
};
