import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import PostModal from "./PostModal";

export default function ProfilePost({ post, user, comments }) {

    const [showModal, setShowModal] = useState(false);
    const [modalPost, setModalPost] = useState({});

    useEffect(() => {
        // console.log('ProfilePost', comments)
    }, [])

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
                    <PostModal post={modalPost} user={user} />
                </Modal>
            )}
        </>
    )
}
