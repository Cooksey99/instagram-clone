import { csrfFetch } from "./csrf";

const GET_POSTS = 'session/GET_POSTS';
const USER_POSTS = 'session/USER_POSTS';
const CREATE_POST = 'session/CREATE_POST';
const EDIT_POST = 'session/EDIT_POST';
const DELETE_POST = 'session/DELETE_POST';

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
const editPost = (post) => ({
    type: EDIT_POST,
    post
})
const deletePost = () => ({
    type: DELETE_POST
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
export const fetchEditPosts = (post) => async dispatch => {
    const response = await csrfFetch('/api/profile/editPost', {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const data = response.json();
        dispatch(editPost(data));
    }
}
export const fetchDeletePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/deletePost/${postId}`, {
        method: 'DELETE'
    });
    dispatch(deletePost(postId));
}

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
        case EDIT_POST:
            newState.posts[action.post.id] = action.post;
            return newState;
        case DELETE_POST:
            delete newState.posts[action.postId];
            return newState;
        default:
            return state;
    }
}
