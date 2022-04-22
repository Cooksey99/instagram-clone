import { useEffect } from "react"
import Footer from "../Footer/Footer"



export default function NewsfeedSidebar({ user }) {


    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <>
            <section id='newsfeed-sidebar'>
                <div id="fixed-sidebar">
                    <div id="profile-sidebar-tab">
                        <img src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'}
                        onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')}
                        alt='profile image' />
                        <div>
                            <b>{user?.username}</b>
                            <p>{user?.first_name} {user?.last_name}</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            </section>
        </>
    )
}
