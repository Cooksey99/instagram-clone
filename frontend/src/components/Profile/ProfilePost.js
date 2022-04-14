import { useState } from "react";
import { Modal } from "../../context/Modal";
import PostModal from "./PostModal";

export default function ProfilePost({ post, user }) {

    const [showModal, setShowModal] = useState(false);
    const [modalPost, setModalPost] = useState({});

    return (
        <>
            <div key={post?.id} className="single-post-image"
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
