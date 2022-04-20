import { csrfFetch } from "./csrf";

// const POST_COMMENT = 'session/POST_COMMENT';
const GET_COMMENTS = 'session/GET_COMMENTS';

// const postComment = (comment) => ({
//     type: POST_COMMENT,
//     comment
// });
const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

// export const fetchPostComment = (comment) => async dispatch => {
//     const response = csrfFetch('/api/comment/newComment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(comment)
//     });
//     if (response.ok) {
//         const data = response.json();
//         dispatch(postComment(data));
//     };
// };
export const fetchGetComments = (postId) => async dispatch => {
    const response = csrfFetch(`/api/comment/${postId}/all`);

    if (response.ok) {
        console.log('fetch', '\n\n\n', '==================')

        const data = await response.json();
        dispatch(getComments(data));
    };
};

const initialState = { comments: {} }

export default function reducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        // case POST_COMMENT:
        //     newState.comments[action.comment.id] = action.comment;
            // return newState;
        case GET_COMMENTS:
            newState.comments = action.comments;
            let result = Object.assign(result, newState);
            return result;
        default:
            return state;
    }
}
