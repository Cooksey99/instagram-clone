import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const FIND_USER = 'session/FIND_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
const removeUser = () => ({
  type: REMOVE_USER,
});
const findUser = (user) => ({
  type: FIND_USER,
  user
});

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};
export const fetchFindUser = (id) => async dispatch => {
  const response = await csrfFetch(`/api/users/${id}`);

  const data = await response.json();
  dispatch(findUser(data));
}

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    case FIND_USER:
      newState = state;
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
}

export default reducer;
