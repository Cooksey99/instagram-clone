import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCreatePost } from "../../store/posts";
import './PostForm.css';


export default function PostForm({ user }) {

    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');

    const handleSubmit = () => {
        const data = {
            user_id: user.id,
            image,
            caption
        }
        dispatch(fetchCreatePost(data));
    }

    return (
        <>
            <div id="new-post-modal">
                <nav>Create new post</nav>
                <hr />
                {/* <h3>Drag photos and videos here</h3>
                <button>Select from computer</button> */}
                <form onSubmit={handleSubmit}>
                    <input placeholder="Image URL" required
                        onChange={(e) => setImage(e.target.value)} />
                    <textarea placeholder="Caption" required
                        onChange={(e) => setCaption(e.target.value)} />
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </>
    )
}
