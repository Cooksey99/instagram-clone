import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { fetchPostData } from "../../store/posts";
import PostModal from "./PostModal";

export default function ProfilePost({ post, user }) {

    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state?.newsfeed?.singlePost);
    const [showModal, setShowModal] = useState(false);
    const [modalPost, setModalPost] = useState({});

    useEffect(() => {
        dispatch(fetchPostData(post.id));
    }, [dispatch])

    return (
        <>
            <div className="single-post-image"
                onClick={() => {
                    setShowModal(true);
                    setModalPost(post);
                }}>
                <img src={post?.image} />
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostModal post={modalPost} user={user} commentsObj={commentsObj} />
                </Modal>
            )}
        </>
    )
}
