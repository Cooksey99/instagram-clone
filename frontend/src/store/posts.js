import { csrfFetch } from "./csrf";

const GET_POSTS = 'session/GET_POSTS';
const USER_POSTS = 'session/USER_POSTS';
const CREATE_POST = 'session/CREATE_POST';
const EDIT_POST = 'session/EDIT_POST';
const DELETE_POST = 'session/DELETE_POST';
const POST_INFO = 'session/POST_INFO';

const POST_COMMENT = 'session/POST_COMMENT';
const EDIT_COMMENT = 'session/EDIT_COMMENT';
const DELETE_COMMENT = 'session/DELETE_COMMENT';

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});
const getUserPosts = (posts) => ({
    type: USER_POSTS,
    posts
});
const createPost = () => ({
    type: CREATE_POST
});
const editPost = (post) => ({
    type: EDIT_POST,
    post
});
const deletePost = () => ({
    type: DELETE_POST
});
const getPostInfo = (postData) => ({
    type: POST_INFO,
    postData
});

const postComment = (comment) => ({
    type: POST_COMMENT,
    comment
});
const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
});
const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

export const fetchGetPosts = () => async dispatch => {
    const response = await csrfFetch('/api/newsfeed');

    const data = await response.json();
    dispatch(getPosts(data));
};
export const fetchUserPosts = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/posts`);

    const data = await response.json();
    dispatch(getUserPosts(data))
};
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const data = response.json();
        dispatch(editPost(data));
    }
};
export const fetchDeletePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/deletePost/${postId}`, {
        method: 'DELETE'
    });
    dispatch(deletePost(postId));
};
export const fetchPostData = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/post/${postId}`);

    const data = response.json()

    data.then(res => res).then(final => dispatch(getPostInfo(final)))

    // console.log(value)
    // dispatch(getPostInfo(data))
};

export const fetchPostComment = (comment) => async dispatch => {
    const response = csrfFetch('/api/comment/newComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = response.json();
        dispatch(postComment(data));
    };
};
export const fetchEditComment = (comment) => async dispatch => {
    console.log('fetchEditComment', comment);
    const response = csrfFetch('/api/comment/editComment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = response.json();
        dispatch(editComment(data));
    };
};
export const fetchDeleteComment = (commentId) => async dispatch => {
    const response = csrfFetch(`/api/comment/delete/${commentId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = response.json();
        dispatch(deleteComment(data));
    };
};

const initialState = { posts: {}, userPosts: {}, singlePost: {} };

export default function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_POSTS:
            newState.posts = action.posts;
            return newState;
        case USER_POSTS:
            newState.userPosts = action.posts;
            return newState;
        case EDIT_POST:
            newState.posts[action.post.id] = action.post;
            return newState;
        case DELETE_POST:
            delete newState.posts[action.postId];
            return newState;
        case POST_INFO:
            newState.singlePost = action.postData;
            return newState;
        //
        // Comment section
        case POST_COMMENT:
            const commendId = action.comment.id;
            // console.log('\n\n\n' + commendId + '\n\n\n');
            newState.singlePost.comment.commendId = action.comment;
            return newState;
        case EDIT_COMMENT:
            newState.singlePost.comment[action.comment.id] = action.comment;
            return newState;
        case DELETE_POST:
            delete newState.singlePost.comment[action.comment.id];
            return newState;
        default:
            return state;
    }
}
