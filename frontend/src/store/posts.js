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
export const fetchEditPosts = (post, id) => async dispatch => {
    const response = await csrfFetch(`/api/profile/editPost/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const data = await response.json();
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

    const data = await response.json()

    dispatch(getPostInfo(data))
};

export const fetchPostComment = (comment) => async dispatch => {
    const response = await csrfFetch('/api/comment/newComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postComment(data));
    };
};
export const fetchEditComment = (comment, commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comment/editComment/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(editComment(data));
    }
};
export const fetchDeleteComment = (commentId) => async dispatch => {
    await csrfFetch(`/api/comment/delete/${commentId}`, {
        method: 'DELETE'
    });
    dispatch(deleteComment(commentId));
};

const initialState = { posts: {}, userPosts: {}, singlePost: {} };

export default function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_POSTS:
            console.log("POSTS: ", action.posts);
            
            newState.posts = action.posts;
            return newState;
        case USER_POSTS:
            newState.userPosts = action.posts;
            return newState;
        case EDIT_POST:
            if (newState.posts.length > 0) newState.posts = newState.posts.map(single => single.post.id === action.post.id ? single.post = action.post : single);
            newState.singlePost.post = { ...action.post };
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
            newState.singlePost.comments = [...newState.singlePost.comments, action.comment]
            return newState;
        case EDIT_COMMENT:
            newState.singlePost.comments = newState.singlePost.comments.map(comment => comment.comment.id === action.comment.id ? { user: comment.user, comment: action.comment } : comment);
            return newState;
        case DELETE_COMMENT:
            newState.singlePost.comments = newState.singlePost.comments.filter(comment => comment.comment.id !== action.commentId);
            return newState;
        default:
            return state;
    }
}
