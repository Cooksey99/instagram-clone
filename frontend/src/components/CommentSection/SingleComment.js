import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './SingleComment.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function SingleComment({ comment, user, sessionUser }) {

    const history = useHistory();
    const [sameUser, setSameUser] = useState(sessionUser.id === user.id);

    useEffect(() => {

    }, []);

    return (
        <>
            <section className="single-comment">
                <img onClick={() => history.push(`/profile/${user?.id}`)}
                    src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                <p><b>{user?.username}</b> {comment.comment}</p>
                {sameUser && (
                   <MoreHorizIcon />
                )}
            </section>
        </>
    )
}
