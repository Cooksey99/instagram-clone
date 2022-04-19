// import { csrfFetch } from "./csrf";

// const POST_COMMENT = 'session/POST_COMMENT';

// const postComment = (comment) => ({
//     type: POST_COMMENT,
//     comment
// });

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

// const initialState = { comments: {} }

// export default function reducer(state = initialState, action) {
//     let newState = initialState;
//     switch (action.type) {
//         case POST_COMMENT:
//             newState.comments[action.comment.id] = action.comment;
//             return newState;
//         default:
//             return state;
//     }
// }
