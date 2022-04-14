import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import './EditPostForm.css'

export default function EditPostForm({ post, user }) {

    const location = useLocation();
    const history = useHistory();

    const [postCaption, setPostCaption] = useState(post.caption);

    useEffect(() => {
        console.log('location', location.pathname)
    }, [])

    return (
        <>
            <section id='edit-post'>
                    <div id='edit-post-header'>
                        <button>Cancel</button>
                        <h3>Edit Form</h3>
                        <button>Done</button>
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
