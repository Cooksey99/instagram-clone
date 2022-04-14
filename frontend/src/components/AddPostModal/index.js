import { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PostForm from './PostForm';
import { useSelector } from 'react-redux';

export default function AddPostModal() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state?.session?.user);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <AddBoxOutlinedIcon />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostForm user={user}/>
                </Modal>
            )}
        </>
    )
}
