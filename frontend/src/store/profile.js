import { csrfFetch } from "./csrf";

const FIND_USER = 'session/FIND_USER';
const SEARCH_USER = 'session/SEARCH_USER';
const GET_FOLLOWS = 'session/GET_FOLLOWS';
const UNFOLLOW_USER = 'session/UNFOLLOW_USER';
const FOLLOW_USER = 'session/FOLLOW_USER';

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
});
const unfollowUser = (id) => ({
  type: UNFOLLOW_USER,
  id
});
const followUser = (follow) => ({
  type: FOLLOW_USER,
  follow
});


export const fetchFindUser = (id) => async dispatch => {
  const response = await csrfFetch(`/api/profile/${id}`);

  const data = await response.json();
  dispatch(findUser(data));
};
export const fetchSearchUser = (string) => async dispatch => {
  const response = await csrfFetch(`/api/profile/search/${string}`);

  const data = await response.json();
  dispatch(searchUser(data));
};
export const fetchGetFollows = (id) => async dispatch => {
  const response = await csrfFetch(`/api/follow/${id}`)

  console.log('testing the user id', id)
  const data = await response.json();
  dispatch(getFollows(data));
};
export const fetchUnfollowUser = (id) => async dispatch => {
  const response = await csrfFetch(`/api/follow/unfollow/${id}`, {
    method: 'DELETE'
  });

  dispatch(unfollowUser(id));
};
export const fetchFollowUser = (following_user_id, followed_user_id) => async dispatch => {
  const response = await csrfFetch('/api/follow/follow_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ following_user_id, followed_user_id })
  })
};

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
    case UNFOLLOW_USER:
      delete newState.follows.followersObj.followers[action.id];
      delete newState.follows.followersObj.follwerUsers[action.id];
    case FOLLOW_USER:
      newState.follows[action.follow.id] = action.follow;
      return newState
    default:
      return state;
  };
};
