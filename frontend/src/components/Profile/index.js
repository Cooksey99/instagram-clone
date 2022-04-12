import { useReducer } from "react";
import { useSelector } from "react-redux";
import './Profile.css'
import SettingsIcon from '@mui/icons-material/Settings';

export default function Profile() {

    const user = useSelector(state => state?.session?.user);

    return (
        <>
            <section>
                <div className='profile-info'>
                    <div className="divider">
                        <img className='profile-image' src='https://register.pravasikerala.org/public/images/avatar5.png' alt='profile image' />
                    </div>
                    <div className="divider">
                        <div className="main-tab">
                            <h2>{user.username}</h2>
                            <div className='edit-profile'>
                                <button>Edit Profile</button>
                            </div>
                            <button><SettingsIcon /></button>
                        </div>
                        <div className="main-tab middle-tab">
                            <p>posts</p>
                            <p>followers</p>
                            <p>following</p>
                        </div>
                        <div className="bio-tab">
                            <b>{user.first_name} {user.last_name}</b>
                            <p>{user.bio}</p>

                        </div>
                    </div>
                    <div className="divider">

                    </div>
                </div>
                <div className='all-posts'>
                </div>

            </section>
        </>
    )
}
