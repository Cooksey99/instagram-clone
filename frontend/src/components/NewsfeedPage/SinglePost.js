import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'; import './NewsfeedPage.css'
import PostSettingModal from "../PostSettingModal";
import { fetchGetPosts, fetchPostComment, fetchPostData } from "../../store/posts";
import CommentForm from "../CommentSection/CommentForm";

export default function SinglePost({ post, user }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [comment, setComment] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        let commentData = {
            post_id: post.post.id,
            user_id: user.id,
            comment
        }
        console.log(post.post.id, user.id)
        await dispatch(fetchPostComment(commentData));
        // dispatch(fetchPostData(post.id));
        setComment('');
    }

    useEffect(() => {
        dispatch(fetchGetPosts());
        // dispatch(fetchPostData(post.id));
    }, [dispatch])

    return (
        <>
            <section className="single-post">
                <div className="top-bar-post">
                    <div className="post-profile-pic">
                        <img onClick={() => history.push(`/profile/${post?.user?.id}`)}
                            src={post?.user?.image ? post?.user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                        <Link to={`/profile/${post?.user?.id}`}>{post?.user?.username}</Link>
                    </div>
                    <PostSettingModal post={post.post} page={'newsfeed'} />
                </div>
                <div className="post-pic">
                    <img src={post?.post?.image} alt='post image' />
                </div>
                <div className="icon-bar">
                    <FavoriteBorderIcon />
                    <ModeCommentOutlinedIcon onClick={() => document.getElementById('input-click').focus()} />
                </div>
                <div className="caption-bar">
                    <p><b>
                        <Link to={`/profile/${post?.user?.id}`}>{post?.user?.username}</Link>
                    </b> {post?.post?.caption}</p>
                </div>
                {/* <form className="comment-input">
                    <input placeholder="Add a comment..." />
                    <button><b>Post</b></button>
                </form> */}
                <form className="comment-input" onSubmit={handleSubmit}>
                    <input placeholder="Add a comment..."
                        maxLength='300'
                        required
                        id='input-click'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <button className="submit-comment" type='submit'>Post</button>
                </form>
            </section>
        </>
    )
}
