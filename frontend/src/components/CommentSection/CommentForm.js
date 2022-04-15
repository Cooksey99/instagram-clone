import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPostComment } from '../../store/comment';

export default function CommentForm({ user, post }) {

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        let commentData = {
            post_id: post.id,
            user_id: user.id,
            comment
        }

        dispatch(fetchPostComment(commentData));
        
    }

    return (
        <>
            <section>
                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea placeholder="Add a comment..."
                        onChange={(e) => setComment(e.target.value)} />
                    <button className="submit-comment" type='submit'>Post</button>
                </form>
            </section>
        </>
    )
}
