import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCHING_USERS,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_FAILURE
} from "../actions";

const initialState = {
  error: null,
  users: [],
  isLoggingIn: false,
  isLoggedIn: false,
  isNotLoggedIn: false,
  isRegistering: false,
  isRegistered: false,
  isNotRegistered: false,
  fetchingUsers: false,
  fetchedUsers: false,
  token: null,
  userId: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return {
        ...state,
        fetchingUsers: true,
        isRegistered: false
      };
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        fetchingUsers: false,
        fetchedUsers: true
      };
    case FETCHING_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        fetchingUsers: false
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isNotLoggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        userId: action.userId,
        token: action.token
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        isNotLoggedIn: true,
        error: action.payload
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
        isNotRegistered: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isRegistered: false,
        isRegistering: false,
        isNotRegistered: true,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
