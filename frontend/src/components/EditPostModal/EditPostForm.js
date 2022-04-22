import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchEditPosts, fetchPostData } from '../../store/posts';
import './EditPostForm.css';

export default function EditPostForm({ post, user, setShowModal }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // const updatedPost = useSelector(state => state?.newsfeed?.singlePost?.post);
    const [caption, setCaption] = useState('');

    useEffect(async () => {
        await dispatch(fetchPostData(post?.id))
        await setPostCaption(post?.caption)
    }, [dispatch])

    const [postCaption, setPostCaption] = useState('');


    const handleEdit = async (e) => {
        let id = post.id;
        let newPost = {
            image: post.image,
            caption: postCaption
        }
        dispatch(fetchEditPosts(newPost, id));
        setPostCaption(post?.caption)
        // dispatch(fetchPostData(post.id));
    }


    return (
        <>
            <form id='edit-post' onSubmit={() => {
                handleEdit();
                setShowModal(false);
            }}>
                <div id='edit-post-header'>
                    <button className='cancel-button' type='button' onClick={() => setShowModal(false)}>Cancel</button>
                    <h3>Edit Form</h3>
                    <button className='done-button' type='submit' onClick={() => setPostCaption(postCaption.trim())}>Done</button>
                </div>
                <div id='edit-post-modal'>
                    <div id="edit-post-left">
                        <img src={post?.image} alt='image'
                        onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')}/>
                    </div>
                    <div id="edit-post-right">
                        <div id='edit-post-top-bar'>
                            <div className='post-modal-profile-bar'>
                                <img src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'}
                                onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')} alt='profile image' />
                                <p><b>{user?.username}</b></p>
                            </div>
                        </div>
                        <textarea id='edit-caption'
                            value={postCaption}
                            onChange={(e) => setPostCaption(e.target.value)}
                            maxLength='2200'
                            required
                        />
                        <div className='text-counter'>
                            <p>{postCaption?.length ? postCaption?.length.toLocaleString("en-US") : '0'}/2,200</p>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
