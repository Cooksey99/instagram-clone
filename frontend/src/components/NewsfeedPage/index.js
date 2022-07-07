import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGetPosts } from "../../store/posts";
import SinglePost from "./SinglePost";
import './NewsfeedPage.css'
import NewsfeedSidebar from "./NewsfeedSidebar";
import { Link } from "react-router-dom";

export default function NewsfeedPage({ user }) {
    const dispatch = useDispatch();
    const posts = useSelector(state => state?.newsfeed?.posts);


    useEffect(() => {
        dispatch(fetchGetPosts())
    }, [dispatch])

    return (
        <>
            <section id='newsfeed-page'>
                <div id="newsfeed-container">
                    {posts.length > 0 && posts.map(post => (
                        <div key={post.id} className='single-post-contain'>
                            <SinglePost post={post} user={user} />
                        </div>
                    ))}
                </div>
                <NewsfeedSidebar user={user} />
            </section>
        </>
    )
}
