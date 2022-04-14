import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'; import './NewsfeedPage.css'
import PostSettingModal from "../PostSettingModal";

export default function SinglePost({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

    }, [])

    return (
        <>
            <section className="single-post">
                <div className="top-bar-post">
                    <div className="post-profile-pic">
                        <img onClick={() => history.push(`/profile/${post?.user?.id}`)}
                            src={post?.user?.image ? post?.user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                        <Link to={`/profile/${post?.user?.id}`}>{post?.user?.username}</Link>
                    </div>
                    <PostSettingModal post={post.post}/>
                </div>
                <div className="post-pic">
                    <img src={post?.post?.image} alt='post image' />
                </div>
                <div className="icon-bar">
                    <FavoriteBorderIcon />
                    <ModeCommentOutlinedIcon />
                </div>
                <div className="caption-bar">
                    <p>{post?.post?.caption}</p>
                </div>
                <form className="comment-input">
                    <input placeholder="Add a comment..." />
                    <button><b>Post</b></button>
                </form>
            </section>
        </>
    )
}
