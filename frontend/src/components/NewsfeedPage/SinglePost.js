import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link, useLocation } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'; import './NewsfeedPage.css'
import PostSettingModal from "../PostSettingModal";
import { fetchGetPosts, fetchPostComment, fetchPostData } from "../../store/posts";
import CommentForm from "../CommentSection/CommentForm";
import ProfilePost from "../Profile/ProfilePost";
import NewsfeedPost from "./NewsfeedPost";

export default function SinglePost({ post, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [comment, setComment] = useState('');
    const [postModal, setPostModal] = useState(false);
    const updatedPost = useSelector(state => state?.newsfeed?.singlePost?.post);
    const updatedUser = useSelector(state => state?.newsfeed?.singlePost?.user);
    const sessionUser = useSelector(state => state?.session?.user);

    const handleSubmit = async e => {
        e.preventDefault();

        let commentData = {
            post_id: post?.post?.id,
            user_id: user?.user?.id,
            comment
        }
        
        dispatch(fetchPostComment(commentData));
        setComment('');
    }

    useEffect(async () => {
        await dispatch(fetchGetPosts());
    }, [dispatch])

    return (
        <>
            {/* <img
            src={imageSrc}
            onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')}/> */}
            <section className="single-post">
                <div className="top-bar-post">
                    <div className="post-profile-pic">
                        <img onClick={() => history.push(`/profile/${updatedUser?.id}`)}
                            onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')}
                            src={updatedUser?.image ? updatedUser?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                        <Link to={`/profile/${post?.user?.id}`}>{post?.user?.username}</Link>
                    </div>
                    <PostSettingModal post={post?.post} page={'newsfeed'} />
                </div>
                <div className="post-pic">
                    <img src={post?.post?.image}
                    onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')} alt='post image' />
                </div>
                <div className="icon-bar">
                    {/* <FavoriteBorderIcon /> */}
                    {/* <ModeCommentOutlinedIcon onClick={() => document.getElementById(`post${post.post.id}`).focus()} /> */}
                </div>
                <div className="caption-bar">
                    <p><b>
                        <Link to={`/profile/${post?.user?.id}`}>{post?.user?.username}</Link>
                    </b> {post?.post?.caption}</p>
                </div>
                <div>
                    {/* <Link to={`/${updatedPost.user_id}/post/${updatedPost.id}`}>View all comments</Link> */}
                    <div className="view-comments">
                        <b>
                            <NewsfeedPost post={post?.post} user={post?.user} />
                        </b>
                    </div>
                </div>
                {/* <form className="comment-input" onSubmit={handleSubmit}>
                    <input placeholder="Add a comment..."
                        maxLength='300'
                        required
                        // id={`post/${post.post.id}`}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <button className="submit-comment" type='submit'>Post</button>
                </form> */}
                <CommentForm user={sessionUser} post={post?.post} page={'newsfeed'} />
            </section>
        </>
    )
}
