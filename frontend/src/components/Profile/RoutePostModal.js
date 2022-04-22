import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import PostModal from "./PostModal";



export default function RoutePostModal() {

    const { id, postId } = useParams();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state?.session?.user);
    const user = useSelector(state => state?.newsfeed?.singlePost?.user);
    const post = useSelector(state => state?.newsfeed?.singlePost?.post);


    useEffect(async () => {
        await dispatch(fetchPostData(postId));
        console.log(user);
    }, [dispatch])

    return (
        <>
            <button id='modal-click' onClick={() => setShowModal(true)}>

            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostModal sessionUser={sessionUser} user={user} post={post} />
                </Modal>
            )}
        </>
    )
}
