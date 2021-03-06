import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { fetchPostData } from "../../store/posts";
import PostModal from "./PostModal";

export default function ProfilePost({ post, user }) {

    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state?.newsfeed?.singlePost);
    const sessionUser = useSelector(state => state?.session?.user);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // dispatch(fetchPostData(post.id));
    }, [dispatch])

    return (
        <>
            <div className="single-post-image"
                onClick={() => {setShowModal(true)}}>
                <img src={post?.image} onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')} />
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostModal sessionUser={sessionUser} post={post} user={user} />
                </Modal>
            )}
        </>
    )
}
