import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchEditPosts, fetchPostData } from '../../store/posts';
import './EditPostForm.css';

export default function EditPostForm({ post, user, setShowModal }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [postCaption, setPostCaption] = useState(post.caption);


    const handleEdit = async (e) => {
        let id = post.id;
        let newPost = {
            image: post.image,
            caption: postCaption
        }
        dispatch(fetchEditPosts(newPost, id));
        await setPostCaption(postCaption);
        // dispatch(fetchPostData(post.id));
    }

    useEffect(() => {
        // console.log('location', location.pathname)
        // console.log('postCaption', postCaption)
        console.log('post', post.caption)
        // dispatch(fetchPostData);
    }, [handleEdit])

    return (
        <>
            <section id='edit-post'>
                    <div id='edit-post-header'>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
                        <h3>Edit Form</h3>
                        <button className='done-button' onClick={() => {
                            handleEdit();
                            setShowModal(false);
                        }}>Done</button>
                    </div>
                <div id='edit-post-modal'>
                    <div id="edit-post-left">
                        <img src={post.image} alt='image' />
                    </div>
                    <div id="edit-post-right">
                        <div id='edit-post-top-bar'>
                            <div className='post-modal-profile-bar'>
                                <img src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                                <p><b>{user?.username}</b></p>
                            </div>
                        </div>
                        <textarea id='edit-caption'
                            value={postCaption}
                            onChange={(e) => setPostCaption(e.target.value)}/>
                        <div className='text-counter'>
                            <p>{postCaption.length ? postCaption.length : '0'}/2,200</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
