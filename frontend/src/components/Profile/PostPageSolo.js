// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchPostData } from "../../store/posts";
// import PostModal from "./PostModal";


// export default function PostPageSolo() {

//     const dispatch = useDispatch();
//     const { postId } = useParams();

//     const postObj = useSelector(state => state?.newsfeed?.singlePost);
//     const user = useSelector(state => state?.sessionUser?.user);

//     useEffect(async () => {
//         await dispatch(fetchPostData(postId));
//         console.log(postObj)
//     }, [dispatch])

//     return (
//         <>
//             <section>
//                 <h1>HELLO</h1>
//                 {/* <PostModal post={post} user={user} /> */}
//             </section>
//         </>
//     )
// }
