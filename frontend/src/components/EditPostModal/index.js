import { useState } from "react"
import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";


export default function EditPostModal({ post, user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='post-setting-tab' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="modal-border">
                        <EditPostForm post={post} user={user} setShowModal={setShowModal} />
                    </div>
                </Modal>
            )}
        </>
    )
}
