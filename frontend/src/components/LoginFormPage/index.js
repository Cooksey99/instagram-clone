import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { fetchGetPosts } from "../../store/posts";

import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import './LoginForm.css';
import Footer from "../Footer/Footer";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector(state => state?.newsfeed?.posts);
  
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    dispatch(fetchGetPosts());
    console.log('posts: ', posts);
  }, [dispatch]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const credential = 'demo@user.io';
    const password = 'password';
    
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }


  return (
    <>
      <section id="login-section">
        <div id="login-left">
          <div className="phone-animation-container">
            <div className="phone-animation">
              <img alt="" className="phone-image" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"
              onError={(e) => (e.target.onerror = null, e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png')}/>
              {/* <img alt="" className="phone-image" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png" />
              <img alt="" className="phone-image" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png" />
              <img alt="" className="phone-image" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png" /> */}
            </div>
          </div>
        </div>
        <div id="login-right">
          <div id="login-form-container">
            <h1 className="logo-name login-h1">Inthtagram</h1>
            <form onSubmit={handleSubmit} id='login-form'>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Username or Email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                maxLength='256'
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength='60'
                required
              />
              <button type="submit">Log In</button>
              <div id="or-divider">
                <div className="border-line"></div>
                <div className="or-text">OR</div>
                <div className="border-line"></div>
              </div>
              <button type="submit"
                onClick={demoLogin}>Demo User</button>
            </form>
          </div>

            <div id="sign-up-link">
              <p>Don't have an account?
              <Link to='/signup'> Sign up</Link>
              </p>

            </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginFormPage;
