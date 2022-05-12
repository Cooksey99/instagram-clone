import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { fetchDeletePost } from "../../store/posts";

export default function DeletePostModal({ postId, modalShow }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (postId) => {
        dispatch(fetchDeletePost(postId));
        window.location.reload(false);
    }

    return (
        <>
            <button className='post-setting-tab delete-option'
                onClick={() => {
                    setShowModal(true);
                }}>
                <b>Delete</b></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="confirm-delete">
                        <div className='delete-pop-background'>
                            <h3>Delete Post?</h3>
                            <p>Are you sure you want to delete this post?</p>
                            <button onClick={() => {
                                handleDelete(postId);
                                modalShow(false);
                            }} className='delete delete-option'>Delete</button>
                            <button onClick={() => {
                                setShowModal(false);
                                modalShow(false);
                            }}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
