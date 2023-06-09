import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ViewPosts from './components/ViewPosts';
import HomePage from './components/HomePage';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails'; // Import the PostDetails component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Fetched token:', token); // Check the fetched token
    setToken(token);
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
    setToken('');
    setUserName('');
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Router>
        <Header isAuthenticated={loggedIn} handleLogout={handleSignOut} />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          {loggedIn && (
            <>
              <Route
                path="/posts"
                element={<ViewPosts token={token} isAuthenticated={loggedIn} />}
              />
              <Route
                path="/posts"
                element={<ViewPosts token={token} isAuthenticated={loggedIn} />}
              />
              <Route
                path="/edit/:post_id"
                element={<EditPost token={token} />}
              />
            </>
          )}
          {!loggedIn ? (
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
          ) : (
            <>
              <Route
                path="/"
                element={<HomePage token={token} />}
              />
              <Route
                path="/posts/:post_id" // Add a route for /posts/:post_id
                element={<PostDetails token={token} />}
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
