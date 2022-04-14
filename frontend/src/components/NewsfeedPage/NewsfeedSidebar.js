import { useEffect } from "react"



export default function NewsfeedSidebar({ user }) {


    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <>
            <section id='newsfeed-sidebar'>
                <div id="fixed-sidebar">
                    <div id="profile-sidebar-tab">
                        <img src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                        <div>
                            <b>{user?.username}</b>
                            <p>{user?.first_name} {user?.last_name}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
