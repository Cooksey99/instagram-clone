import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { restoreUser } from "../../store/session";


export default function Settings() {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    const handleEdit = () => {
        let data = {
            firstName,
            lastName,
            username,
            bio
        };
        
    };

    useEffect(() => {
        // dispatch(restoreUser())
    }, [dispatch])

    return (
        <>
            <section id="setting-page">
                <div>
                    <img className='profile-img settings-image' src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                    <h3>{user?.username}</h3>
                    <button>Change Profile Photo</button>
                </div>
                <div className="setting-input">
                    <label>First name</label>
                    <input onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="setting-input">
                    <label>Last name</label>
                    <input onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="setting-input">
                    <label>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="setting-input">
                    <label>Bio</label>
                    <textarea onChange={(e) => setBio(e.target.value)}/>
                </div>
            </section>
        </>
    )
}
