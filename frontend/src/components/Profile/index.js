import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Profile.css'
import SettingsIcon from '@mui/icons-material/Settings';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import { fetchUserPosts } from "../../store/posts";
import { Modal } from "../../context/Modal";
import PostModal from "./PostModal";
import { stepButtonClasses } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchFindUser } from "../../store/profile";

export default function Profile() {

    const { id } = useParams();

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalPost, setModalPost] = useState({});

    const user = useSelector(state => state?.profile?.user);
    const posts = useSelector(state => state?.newsfeed?.posts)

    useEffect(() => {
        dispatch(fetchFindUser(id));
        dispatch(fetchUserPosts(id));
        console.log(id)
    }, [dispatch])

    return (
        <>
            <section id="profile-page">
                <div className='profile-info'>
                    <div className="divider">
                        <img className='profile-image' src='https://register.pravasikerala.org/public/images/avatar5.png' alt='profile image' />
                    </div>
                    <div className="divider">
                        <div className="main-tab">
                            <h2>{user?.username}</h2>
                            <div className='edit-profile'>
                                <button>Edit Profile</button>
                            </div>
                            <button><SettingsIcon /></button>
                        </div>
                        <div className="main-tab middle-tab">
                            <p><b>{posts?.length}</b> posts</p>
                            <p><b>0</b> followers</p>
                            <p><b>0</b> following</p>
                        </div>
                        <div className="bio-tab">
                            <b>{user?.first_name} {user?.last_name}</b>
                            <p>{user?.bio}</p>

                        </div>
                    </div>
                    <div className="divider">

                    </div>
                </div>

                <div id="posts-tab">
                    <GridOnSharpIcon />
                    <p>POSTS</p>
                </div>

                {/* Area that displays all of the images/posts */}
                <div id='all-posts'>
                    {posts?.length > 0 && posts.map(post => (
                        <div key={post?.id} className="single-post-image"
                            onClick={() => {
                                setShowModal(true);
                                setModalPost(post);
                            }}>
                            <img src={post?.image} />
                        </div>
                    ))}
                </div>


            </section>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostModal post={modalPost} user={user} />
                </Modal>
            )}
        </>
    )
}
