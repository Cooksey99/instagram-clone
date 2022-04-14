import { useHistory, Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './PostModal.css';
import PostSettingModal from '../PostSettingModal';

export default function PostModal({ post, user }) {
    const history = useHistory();

    return (
        <>
            <section id='post-modal'>
                <div id="post-modal-left">
                    <img src={post.image} alt='image' />
                </div>
                <div id="post-modal-right">
                    <div id='post-modal-top-bar'>
                        <div className='post-modal-profile-bar'>
                            <img onClick={() => history.push(`/profile/${user.id}`)}
                                src={user?.image ? user?.image : 'https://register.pravasikerala.org/public/images/avatar5.png'} alt='profile image' />
                            <Link to={`/profile/${user?.id}`}>{user?.username}</Link>
                        </div>
                        <div className='dot-menu'>
                           <PostSettingModal post={post} user={user} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
