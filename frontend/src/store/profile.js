import { csrfFetch } from "./csrf";

const FIND_USER = 'session/FIND_USER';
const SEARCH_USER = 'session/SEARCH_USER';

const findUser = (user) => ({
  type: FIND_USER,
  user
});
const searchUser = (users) => ({
  type: SEARCH_USER,
  users
})

export const fetchFindUser = (id) => async dispatch => {
  const response = await csrfFetch(`/api/profile/${id}`);

  const data = await response.json();
  dispatch(findUser(data));
}
export const fetchSearchUser = (string) => async dispatch => {

  // let username = [];
  // for (let i = 0; i < string.length; i++) {
  //   username.push(username.charCodeAt(i))
  // }
  // console.log('result', username)

  const response = await csrfFetch(`/api/profile/search/${string}`);

  const data = await response.json();
  dispatch(searchUser(data));
}

const initialState = { user: {}, search: {} };

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case FIND_USER:
      newState.user = action.user;
      return newState;
    case SEARCH_USER:
      newState.search = action.users
    default:
      return state;
  };
};
