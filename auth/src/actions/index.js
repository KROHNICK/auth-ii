import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCHING_USERS_SUCCESS = "FETCHING_USERS_SUCCESS";
export const FETCHING_USERS_FAILURE = "FETCHING_USERS_FAILURE";

export const register = newUser => dispatch => {
  dispatch({ type: REGISTER_REQUEST });
  axios
    .post("http://localhost:3000/api/register", newUser)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILURE, payload: err });
      console.log(err.response);
    });
};

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .post("http://localhost:3000/api/login", creds)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        userId: res.data.id,
        token: res.data.token
      });
    })
    .catch(err => dispatch({ type: LOGIN_FAILURE, payload: err }));
};

export const getUsers = headersObj => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios
    .get("http://localhost:3000/api/login/users", headersObj)
    .then(res => dispatch({ type: FETCHING_USERS_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: FETCHING_USERS_FAILURE, payload: err }));
};
