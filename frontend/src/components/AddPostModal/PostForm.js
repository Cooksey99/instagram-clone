import { useDispatch } from "react-redux"



export default function PostForm() {

    const dispatch = useDispatch();

    return (
        <>
            <div>
                <nav>Create new post</nav>
                <hr />
                <h3>Drag photos and videos here</h3>
                <button>Select from computer</button>
            </div>
        </>
    )
}
