import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState('');
  const [userName, setUserName] = useState('');
  const [redirectToPosts, setRedirectToPosts] = useState(false);

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

  const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const userName = response.data.user.display_name; // Get the user's name
        localStorage.setItem('token', token);
        setJwtToken(token);
        setLoggedIn(true);
        setUserName(userName); // Update the user's name
        setRedirectToPosts(true);
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
    const [redirectToPosts, setRedirectToPosts] = useState(false); // Add state for redirection

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
        setRedirectToPosts(true); // Set the state to redirect to posts page
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
    <div>
      <Router>
        <nav>
          <ul>
            {!loggedIn ? (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/create">Create Post</Link>
                </li>
                <li>
                  <Link to="/posts">View Posts</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {loggedIn && redirectToPosts && (
            <>
              <Route path="/create" element={<CreatePost token={jwtToken} />} />
              <Route path="/posts" element={<ViewPosts />} />
            </>
          )}
          {!loggedIn ? (
            <Route path="/" element={<Navigate to="/signin" replace />} />
          ) : (
            <Route path="/" element={<Navigate to="/posts" replace />} />
          )}
        </Routes>
      </Router>
      {loggedIn && (
        <div>
          <p>Logged in - {userName}</p>
        </div>
      )}
    </div>
  );
}

export default App;
