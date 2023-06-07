import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreatePost from './components/CreatePost';
import ViewPosts from './components/ViewPosts';
import HomePage from './components/HomePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Fetched token:', token); // Check the fetched token
    setJwtToken(token);
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
    setJwtToken('');
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
                path="/create"
                element={<CreatePost token={jwtToken} />}
              />
              <Route
                path="/posts"
                element={<ViewPosts token={jwtToken} />}
              />
            </>
          )}
          {!loggedIn ? (
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
          ) : (
            <Route
              path="/"
              element={<HomePage token={jwtToken} />}
            />
          )}
        </Routes>
      </Router>
      {loggedIn && (
        <div>
          <p className="text-center mt-4 text-gray-600">
            Logged in - {userName}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
