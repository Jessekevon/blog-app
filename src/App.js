import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState('');

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
    localStorage.removeItem('token');
  };

  const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToPosts, setRedirectToPosts] = useState(false); // Add state for redirection

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          user: {
            display_name: displayName,
            email: email,
            password: password,
          },
        };
        const response = await axios.post(
          'https://brivity-react-exercise.herokuapp.com/users',
          payload
        );
        const token = response.headers.authorization.split(' ')[1];
        localStorage.setItem('token', token); // Save the token to local storage
        setJwtToken(token); // Update the token state
        setLoggedIn(true); // Update the loggedIn state
        // Redirect to the page where users can create and view posts
        return <Navigate to="/posts" replace />;
        setRedirectToPosts(true); // Set the state to redirect to posts page
      } catch (error) {
        console.error('Sign-up failed', error.response.data);
      }
    };

    // Redirect to posts page if redirectToPosts is true
    if (redirectToPosts) {
      return <Navigate to="/posts" replace />;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Display Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToPosts, setRedirectToPosts] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          user: {
            email: email,
            password: password,
          },
        };
        const response = await axios.post(
          'https://brivity-react-exercise.herokuapp.com/users/sign_in',
          payload
        );
        const token = response.headers['authorization'];
        localStorage.setItem('token', token);
        setJwtToken(token);
        setLoggedIn(true);
        setRedirectToPosts(true);
      } catch (error) {
        console.error('Sign-in failed', error.response.data);
      }
    };

    if (redirectToPosts) {
      return <Navigate to="/posts" replace />;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CreatePost = ({ token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          'https://brivity-react-exercise.herokuapp.com/posts',
          {
            title,
            content,
          },
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Failed to create post', error);
      }
    };

    return (
      <div>
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  };

  const ViewPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://brivity-react-exercise.herokuapp.com/posts',
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        const { data } = response;
        setPosts(data.posts); // Update to set the posts array
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    useEffect(() => {
      fetchPosts();
    }, []);

    return (
      <div>
        <h2>Posts</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Router>
      <div>
        <h1>Blogging Platform</h1>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {loggedIn ? (
            <>
              <Route path="/create" element={<CreatePost token={jwtToken} />} />
              <Route path="/posts" element={<ViewPosts />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
        {loggedIn && (
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
