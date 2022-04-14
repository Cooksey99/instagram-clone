

export default function SingleComment({ user, comment }) {

    return (
        <>
            <section>
                <img onClick={() => history.push(`/profile/${post?.user?.id}`)}
                    src={post?.user?.image ? post?.user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                <p><b>{user?.username} </b></p>
            </section>
        </>
    )
}
