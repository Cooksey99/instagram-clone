import { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PostForm from './PostForm';

export default function AddPostModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <AddBoxOutlinedIcon />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostForm />
                </Modal>
            )}
        </>
    )
}
