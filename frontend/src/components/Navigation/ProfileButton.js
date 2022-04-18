import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/login')
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-bubble-point"></div>
          <div className="profile-tab"
          onClick={() => history.push(`/profile/${user.id}`)}>
            <AccountCircleOutlinedIcon />
            <p>Profile</p>
          </div>
          <div className="profile-tab"
          onClick={() => history.push('/settings')}>
            <SettingsIcon />
            <p>Settings</p>
          </div>
          <div className="profile-tab logout-button"
          onClick={logout}>
            <p>Log Out</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
