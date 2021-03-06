import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Profile.css'
import SettingsIcon from '@mui/icons-material/Settings';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import { fetchUserPosts } from "../../store/posts";
import { useParams } from "react-router-dom";
import { fetchFindUser, fetchGetFollows, fetchFollowUser, fetchUnfollowUser } from "../../store/profile";
import ProfilePost from "./ProfilePost";
import Footer from "../Footer/Footer";
import { restoreUser } from "../../store/session";
import OpenFollows from "../FollowModal";

export default function Profile() {

    const { id } = useParams();

    const dispatch = useDispatch();
    // const [showModal, setShowModal] = useState(false);
    // const [modalPost, setModalPost] = useState({});

    const currentUser = useSelector(state => state?.session?.user);
    const user = useSelector(state => state?.profile?.user);
    const userPosts = useSelector(state => state?.newsfeed?.userPosts);
    const follows = useSelector(state => state?.profile?.follows);

    useEffect(() => {
        dispatch(fetchFindUser(id));
        dispatch(fetchUserPosts(id));
        dispatch(fetchGetFollows(id));
        dispatch(restoreUser())

    }, [dispatch, id])

    const handleFollow = (e) => {
        // e.preventDefault();
        dispatch(fetchFollowUser(currentUser?.id, user?.id));
    }

    return (
        <>
            <section id="profile-page">
                <div className='profile-info'>
                    <div className='image-div'>
                        <img className='profile-image' src='https://register.pravasikerala.org/public/images/avatar5.png'
                            onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')} alt='profile image' />
                    </div>
                    <div>
                        <div className="main-tab">
                            <div>
                                <h2>{user?.username}</h2>
                                {currentUser?.id !== user?.id && (
                                    <button type="submit"
                                        onClick={() => {
                                        // if (follows?.followersObj?.users.filter(user => user?.id === currentUser?.id).length > 0) {
                                        //     dispatch(fetchUnfollowUser(user?.id));
                                        // } else dispatch(fetchFollowUser(currentUser?.id, user?.id));
                                        handleFollow();
                                    }}
                                        className="follow-button">
                                        {follows?.followersObj?.users.filter(user => user?.id === currentUser?.id).length > 0 ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                            </div>
                            <div className='edit-profile'>
                                {/* <button>Edit Profile</button> */}
                            </div>
                            {/* <button><SettingsIcon /></button> */}
                        </div>
                        <div className="main-tab middle-tab">
                            <p><b>{userPosts?.length}</b> posts</p>
                            <OpenFollows follows={follows} type={"followers"} />
                            <OpenFollows follows={follows} type={"following"} />
                            <p></p>
                            <p></p>
                        </div>
                        <div className="bio-tab">
                            <b>{user?.first_name} {user?.last_name}</b>
                            <p>{user?.bio}</p>

                        </div>
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
