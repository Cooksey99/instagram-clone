import { csrfFetch } from "./csrf";

const GET_POSTS = 'session/GET_POSTS';

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});

export const fetchGetPosts = () => async dispatch => {
    const response = await csrfFetch('/api/newsfeed');

    const data = await response.json();
    console.log(data)
    dispatch(getPosts(data));
}

const initialState = { posts: {} };

export default function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_POSTS:
            newState.posts = action.posts;
            return newState;
        default:
            return state;
    }
}
