import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { fetchPostData } from "../../store/posts";
import PostModal from "../Profile/PostModal";

export default function NewsfeedPost({ post, user }) {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state?.session?.user);

    useEffect(() => {
        // dispatch(fetchPostData(post.id));
    }, [dispatch])

    return (
        <>
            <div className="single-post-image"
                onClick={() => {setShowModal(true)}}>
                <p>View all comments</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostModal sessionUser={sessionUser} post={post} user={user} />
                </Modal>
            )}
        </>
    )
}
