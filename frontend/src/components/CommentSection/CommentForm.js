import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { fetchPostComment, fetchPostData } from '../../store/posts';
import PostModal from '../Profile/PostModal';

export default function CommentForm({ user, post, page }) {

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [postModal, setPostModal] = useState(false);
    const sessionUser = useSelector(state => state?.session?.user);

    const handleSubmit = async e => {
        e.preventDefault();

        let commentData = {
            post_id: post.id,
            user_id: user.id,
            comment
        }

        await dispatch(fetchPostComment(commentData));
        // dispatch(fetchPostData(post.id));
        setComment('');
        if (page === 'newsfeed') setPostModal(true);
    }

    useEffect(() => {
        dispatch(fetchPostData(post?.id));
    }, [dispatch])

    return (
        <>
            <form onSubmit={handleSubmit}>
                {page !== 'newsfeed' && (
                    <div className="comment-form">
                        <textarea placeholder="Add a comment..."
                            maxLength='300'
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                        <button className="submit-comment" type='submit'
                            onClick={() => { setComment(comment.trim()) }}><b>Post</b></button>
                    </div>
                )}
                {page === 'newsfeed' && (
                    <div className="comment-form">
                        <input placeholder="Add a comment..."
                            maxLength='300'
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                        <button className="submit-comment" type='submit'
                            onClick={() => {
                                setComment(comment.trim())
                            }}><b>Post</b></button>
                    </div>
                )}
            </form>
            {postModal && (
                <Modal onClose={() => setPostModal(false)}>
                    <PostModal sessionUser={sessionUser} user={user} post={post} />
                </Modal>
            )}
        </>
    )
}
