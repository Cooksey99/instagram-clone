import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCreatePost } from "../../store/posts";
import './PostForm.css';


export default function PostForm({ user }) {

    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [error, setError] = useState(null);

    function testImage(url) {
        return /(jpg|jpeg|png|webp|avif|gif|svg)/g.test(url);
    }
    const handleSubmit = (e) => {
        console.log(testImage(image))
        if (testImage(image)) {
            const data = {
                user_id: user.id,
                image,
                caption
            }

            dispatch(fetchCreatePost(data));
        } else {
            e.preventDefault();
            console.log(error)
            setError('Please enter a valid image URL.');
        }
    }

    return (
        <>
            <div id="new-post-modal">
                <nav>Create new post</nav>
                <hr />
                {/* <h3>Drag photos and videos here</h3>
                <button>Select from computer</button> */}
                <form onSubmit={handleSubmit} id='new-post-form'>
                    {!error && (
                         <input placeholder="Image URL" required
                         onChange={(e) => setImage(e.target.value)} />
                    )}
                    {error && (
                        <input className='error' placeholder={error} required
                        onChange={(e) => setImage(e.target.value)} />
                    )}
                    <textarea placeholder="Caption"
                        maxLength='2200'
                        required
                        onChange={(e) => setCaption(e.target.value)} />
                    <button type="submit">Create Post</button>
                </form>

            </div>
        </>
    )
}
