import { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import FollowModal from './FollowModal';

export default function OpenFollows({ follows, type }) {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        console.log('follows in modal', follows?.followingObj?.followers?.followers?.length)
    }, []);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                {type === "following" && (
                    <p><b>{follows?.followingObj?.followers?.followers?.length}</b> following</p>
                )}
                {type === "followers" && (
                    <p><b>{follows?.followersObj?.following?.following?.length}</b> followers</p>
                )}
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <FollowModal follows={follows} type={type} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
