import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './SingleComment.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteComment, fetchEditComment, fetchPostData } from "../../store/posts";

export default function SingleComment({ comment, user, sessionUser, postId }) {
    const [commentText, setCommentText] = useState(comment?.comment);

    const dispatch = useDispatch();
    const history = useHistory();
    const [editComment, setEditComment] = useState(false);

    // const currentPost = useSelector(state => state?.newsfeed?.singlePost);

    useEffect(async () => {
        setCommentText(comment?.comment)
        console.log('post', commentText)
    }, [dispatch, editComment]);

    const handleEdit = (e) => {
        e.preventDefault();

        let commentId = comment.id;
        const data = {
            post_id: comment.post_id,
            user_id: user.id,
            comment: commentText
        };

        dispatch(fetchEditComment(data, commentId));
        // dispatch(fetchPostData(postId));
        setEditComment(false)

        // setFinalComment(commentText);
    };

    const handleDelete = () => {
        // console.log(comment.id);
        dispatch(fetchDeleteComment(comment.id));
        setEditComment(false);
        setCommentText('');
        // dispatch(fetchPostData(postId));
    };

    return (
        <>
            <section className="single-comment">
                <img className='profile-img' onClick={() => history.push(`/profile/${user?.id}`)}
                    src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                <div>
                    <p><b>{user?.username}</b> {comment?.comment}</p>
                </div>
                {editComment && (
                    <form onSubmit={handleEdit} className='edit-comment-form'>
                        <div>
                            <div className="edit-comment-popup"><b>Edit comment...</b>
                                <textarea
                                    placeholder="Comment here..."
                                    maxLength='300'
                                    value={commentText}
                                    required
                                    onChange={(e) => setCommentText(e.target.value)} />
                                <button type="submit" onClick={() => setCommentText(commentText.trim())}>Save</button>

                            </div>
                            <div className="edit-buttons">
                                <button type="button" className="cancel-button-comment"
                                    onClick={() => setEditComment(false)}>Cancel</button>
                                <button type="button" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </form>
                )}
                {comment?.user_id === sessionUser?.id && (
                    <MoreHorizIcon onClick={() => setEditComment(true)} />
                )}
            </section>
            {/* {editComment && (
                <section>
                    <textarea value={comment.comment} />
                </section>
            )} */}
        </>
    )
}
