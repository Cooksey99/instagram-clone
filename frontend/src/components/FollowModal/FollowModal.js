import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import './FollowModal.css';


export default function FollowModal({ follows, type, setShowModal }) {

    const history = useHistory();

    const followers = follows?.followingObj?.users;
    const following = follows?.followersObj?.users;

    useEffect(() => {
        console.log(followers)
    }, []);


    return (
        <>
            <div className="follows-container">
                {type === "followers" && (
                    <div>
                        <h3>Followers</h3>
                        {following?.length > 0 && following?.map(follow => (
                            <div key={follow?.id} className='single-follow'
                                onClick={() => {
                                    history.push(`/profile/${follow?.id}`);
                                    setShowModal(false)
                                }}>
                                <img className="profile-img"
                                    src={follow?.profile_picture ? follow?.profile_picture : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='user profile image' />
                                <p>{follow?.username}</p>
                            </div>
                        ))}
                    </div>
                )}
                {type === "following" && followers?.length > 0 && (
                    <div>
                        <h3>Following</h3>
                        {followers?.map(follow => (
                            <div key={follow?.id} className='single-follow'
                                onClick={() => {
                                    history.push(`/profile/${follow?.id}`);
                                    setShowModal(false)
                                }}>
                                <img className="profile-img"
                                    src={follow?.profile_picture ? follow?.profile_picture : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='user profile image' />
                                <p>{follow?.username}</p>
                            </div>
                        ))}
                    </div>
                )}
                <p>{follows.length}</p>
            </div>
        </>
    )
}
