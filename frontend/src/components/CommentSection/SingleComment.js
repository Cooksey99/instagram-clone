import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './SingleComment.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from "react-redux";
import { fetchDeleteComment, fetchEditComment, fetchPostData } from "../../store/posts";

export default function SingleComment({ comment, user, sessionUser, postId }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [editComment, setEditComment] = useState(false);
    const [commentText, setCommentText] = useState(comment?.comment);
    const [sameUser, setSameUser] = useState(sessionUser?.id === comment?.user_id);

    useEffect(async () => {
        // console.log('testing userId\'s', sessionUser?.id, user?.id)
        // console.log(comment.comment ,'---comment============comment.user_id---', comment.user_id)
        console.log('------', comment.comment)
        // await dispatch(fetchPostData(postId));
    }, [dispatch]);

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
        dispatch(fetchPostData(postId));
    };

    return (
        <>
            <section className="single-comment">
                <img className='profile-img' onClick={() => history.push(`/profile/${user?.id}`)}
                    src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                {!editComment && (
                    <div>
                        <p><b>{user?.username}</b> {comment?.comment}</p>
                    </div>

                )}
                {editComment && (
                    <form onSubmit={handleEdit}>
                        <div className="edit-comment-popup"><b>{user?.username}</b>
                            <textarea value={commentText} required
                                onChange={(e) => setCommentText(e.target.value)} />
                        </div>
                        <div className="edit-buttons">
                            <button type="button"
                                onClick={() => setEditComment(false)}>Cancel</button>
                            <button type="button" onClick={handleDelete}>Delete</button>
                            <button type="submit">Save</button>
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
