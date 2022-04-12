import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Search from '../Search';
import AddPostModal from '../AddPostModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className='account-nav'>
          <Link to='/'><HomeRoundedIcon /></Link>
          <AddPostModal />
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <nav id='nav-bar'>
        <NavLink exact to="/" className='logo-name'>Inthtagram</NavLink>
        <Search />
        <div>
          {isLoaded && sessionLinks}
        </div>
      </nav>
    </>

  );
}

export default Navigation;
