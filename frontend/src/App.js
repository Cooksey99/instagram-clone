import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import Profile from './components/Profile';
import NewsfeedPage from './components/NewsfeedPage';
import PostPageSolo from './components/Profile/PostPageSolo';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}

      {isLoaded && (
        <div id='app'>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/newsfeed' exact/>
            </Route>
            <Route path='/login' exact>
              <LoginFormPage />
            </Route>
            <Route path='/signup' exact>
              <SignupFormPage />
            </Route>
            <Route path='/profile/:id' exact>
              <Profile />
            </Route>
            <Route path='/profile' exact>
              <Profile />
            </Route>
            {/* <Route path='/profile/post/:postId' exact>
              <PostPageSolo />
            </Route> */}
            <Route path='/newsfeed' exact>
              <NewsfeedPage user={user} />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
