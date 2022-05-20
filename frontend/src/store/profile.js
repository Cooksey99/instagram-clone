import { csrfFetch } from "./csrf";

const FIND_USER = 'session/FIND_USER';
const SEARCH_USER = 'session/SEARCH_USER';
const GET_FOLLOWS = 'session/GET_FOLLOWS';

const findUser = (user) => ({
  type: FIND_USER,
  user
});
const searchUser = (users) => ({
  type: SEARCH_USER,
  users
});
const getFollows = (follows) => ({
  type: GET_FOLLOWS,
  follows
})

export const fetchFindUser = (id) => async dispatch => {
  const response = await csrfFetch(`/api/profile/${id}`);

  const data = await response.json();
  dispatch(findUser(data));
}
export const fetchSearchUser = (string) => async dispatch => {
  const response = await csrfFetch(`/api/profile/search/${string}`);

  const data = await response.json();
  dispatch(searchUser(data));
}
export const fetchGetFollows = (id) => async dispatch => {
  const response = await csrfFetch(`/api/follow/${id}`)

  console.log('testing the user id', id)
  const data = await response.json();
  dispatch(getFollows(data));
}

const initialState = { user: {}, search: {}, follows: {} };

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case FIND_USER:
      newState.user = action.user;
      return newState;
    case SEARCH_USER:
      if (!action.users) delete newState.search;
      else newState.search = action.users;
      return newState;
    case GET_FOLLOWS:
      newState.follows = action.follows;
      return newState;
    default:
      return state;
  };
};
