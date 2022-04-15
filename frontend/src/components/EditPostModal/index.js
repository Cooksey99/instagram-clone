import { useState } from "react"
import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";


export default function EditPostModal({ post, user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm post={post} user={user} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
