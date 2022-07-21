import { unstable_detectScrollType } from "@mui/utils";
import { csrfFetch } from "./csrf";

const FIND_USER = 'session/FIND_USER';
const SEARCH_USER = 'session/SEARCH_USER';
const GET_FOLLOWS = 'session/GET_FOLLOWS';
const UNFOLLOW_USER = 'session/UNFOLLOW_USER';
const REMOVE_FOLLOWER = 'session/REMOVE_FOLLOWER';
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
const removeFollower = (id) => ({
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
export const fetchRemoveFollower = (id) => async dispatch => {
  const response = await csrfFetch(`/api/follow/remove_follower/${id}`, {
    method: 'DELETE'
  });

  dispatch(removeFollower(id));
};
export const fetchFollowUser = (following_user_id, followed_user_id) => async dispatch => {
  const response = await csrfFetch('/api/follow/follow_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ following_user_id, followed_user_id })
  });
  const data = await response.json();
  dispatch(followUser(data));
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
      // newState.follows.followingObj.followers.filter(follow => follow.followed_user_id === action.id);
      // newState.follows.followingObj.users.filter(user => user.id === action.id);
      delete newState.follows.followersObj;
      console.log(newState.follows.followingObj)
      console.log('unfollow id', action.id);
      return newState;
    case REMOVE_FOLLOWER:
      // newState.follows.followingObj.followers.filter(follow => follow.id !== action.id);
      // newState.follows.followingObj.followerUsers.filter(follow => follow.id !== action.id);
      return newState;
      case FOLLOW_USER:
      console.log('reducer info:', action.follow);
      // const followerId = action.follow.follower.id;
      // const userId = action.follow.user.id;

      // newState.follows.followersObj.following[followerId] = action.follow.follower;
      // newState.follows.followersObj.users[userId] = action.follow.user;
      return newState
    default:
      return state;
  };
};
