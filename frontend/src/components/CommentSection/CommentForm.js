import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPostComment, fetchPostData } from '../../store/posts';

export default function CommentForm({ user, post }) {

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

    return (
        <>
            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea placeholder="Add a comment..."
                    maxLength='300'
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                <button className="submit-comment" type='submit'>Post</button>
            </form>
        </>
    )
}
