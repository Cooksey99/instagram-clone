import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Profile.css'
import SettingsIcon from '@mui/icons-material/Settings';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import { fetchUserPosts } from "../../store/posts";
import { useParams } from "react-router-dom";
import { fetchFindUser } from "../../store/profile";
import ProfilePost from "./ProfilePost";
import Footer from "../Footer/Footer";

export default function Profile() {

    const { id } = useParams();

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalPost, setModalPost] = useState({});

    const user = useSelector(state => state?.profile?.user);
    const userPosts = useSelector(state => state?.newsfeed?.userPosts)

    useEffect(() => {
        dispatch(fetchFindUser(id));
        dispatch(fetchUserPosts(id));
        // console.log('Profile', userPosts)
    }, [dispatch, id])

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
                                {/* <button>Edit Profile</button> */}
                            </div>
                            {/* <button><SettingsIcon /></button> */}
                        </div>
                        <div className="main-tab middle-tab">
                            <p><b>{userPosts?.length}</b> posts</p>
                            {/* <p><b>0</b> followers</p>
                            <p><b>0</b> following</p> */}
                            <p></p>
                            <p></p>
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
                    {userPosts?.length > 0 && userPosts.map(post => (
                        <div key={post?.id}>
                            <ProfilePost post={post} user={user} comments={post.comments} />
                        </div>
                    ))}
                </div>

            <Footer />
            </section>

        </>
    )
}
