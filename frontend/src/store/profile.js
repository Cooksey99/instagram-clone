import { csrfFetch } from "./csrf";

const FIND_USER = 'session/FIND_USER';

const findUser = (user) => ({
    type: FIND_USER,
    user
  });

  export const fetchFindUser = (id) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${id}`);

    const data = await response.json();
    dispatch(findUser(data));
  }

  const initialState = { user: {} };

  export default function reducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FIND_USER:
            newState.user = action.user;
            return newState;
        default:
            return state;
    };
  };
