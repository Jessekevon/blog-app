import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Set the default request headers with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleSignOut = () => {
    setLoggedIn(false);
    setToken('');
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
        const token = response.data.token;
        localStorage.setItem('token', token);
        setToken(token);

        // Redirect to the page where users can create and view posts
        window.location.replace('/posts');
      } catch (error) {
        console.error('Sign-up failed', error.response.data);
      }
    };

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };

  const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const token = response.data.token;
        localStorage.setItem('token', token); // Save the token to local storage
        setToken(token); // Update the token state
        setLoggedIn(true); // Update the loggedIn state
      } catch (error) {
        console.error('Sign-in failed', error.response.data);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
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
            headers: { Authorization: `Bearer ${token}` },
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
        const response = await axios.get('https://brivity-react-exercise.herokuapp.com/posts');
        const { data } = response;
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    useState(() => {
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
              <Route path="/create" element={<CreatePost token={token} />} />
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
