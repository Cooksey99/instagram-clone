import { csrfFetch } from "./csrf";

const GET_POSTS = 'session/GET_POSTS';
const USER_POSTS = 'session/USER_POSTS';
const CREATE_POST = 'session/CREATE_POST';

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});
const getUserPosts = (posts) => ({
    type: USER_POSTS,
    posts
})
const createPost = () => ({
    type: CREATE_POST
})

export const fetchGetPosts = () => async dispatch => {
    const response = await csrfFetch('/api/newsfeed');

    const data = await response.json();
    dispatch(getPosts(data));
}
export const fetchUserPosts = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/posts`);

    const data = await response.json();
    dispatch(getUserPosts(data))
}
export const fetchCreatePost = (postData) => async dispatch => {
    const response = await csrfFetch('/api/profile/newPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data));
        return response;
    };

};

const initialState = { posts: {} };

export default function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_POSTS:
            newState.posts = action.posts;
            return newState;
        case USER_POSTS:
            newState.posts = action.posts;
            return newState;
        default:
            return state;
    }
}
