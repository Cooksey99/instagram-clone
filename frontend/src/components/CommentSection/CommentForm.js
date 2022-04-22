import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPostComment, fetchPostData } from '../../store/posts';

export default function CommentForm({ user, post, page }) {

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

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
    }

    useEffect(async () => {
        await dispatch(fetchPostData(post?.id));
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
                            onClick={() => { setComment(comment.trim()) }}>Post</button>
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
        </>
    )
}
