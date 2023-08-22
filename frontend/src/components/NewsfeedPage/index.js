import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGetPosts } from "../../store/posts";
import SinglePost from "./SinglePost";
import './NewsfeedPage.css'
import NewsfeedSidebar from "./NewsfeedSidebar";

export default function NewsfeedPage({ user }) {
    const dispatch = useDispatch();
    let [posts, setPosts] = useState([]);
    

    useEffect(() => {
        dispatch(fetchGetPosts())
            .then(res => {
                setPosts(res);
            });
    }, [dispatch]);
    


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