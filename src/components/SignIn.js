import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// The SignIn component represents a sign-in form for users to log into the blogging app.
// Users provide their email and password, which are then sent to a server for authentication.
// If successful, the user is redirected to the '/posts' page. Otherwise, an error message is displayed.
const SignIn = () => {
    // 1 - State variables for managing form inputs, redirection, and error handling
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToPosts, setRedirectToPosts] = useState(false);
    const [error, setError] = useState('');

    // 2 - Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                user: {
                    email: email,
                    password: password,
                },
            };
            // Sending a POST request to the server for authentication
            const response = await axios.post(
                'https://brivity-react-exercise.herokuapp.com/users/sign_in',
                payload
            );
            const token = response.headers['authorization'];
            // 3 - If authentication is successful, store our token in localStorage
            if (token) {
                localStorage.setItem('token', token);
                setRedirectToPosts(true);
            } else {
                setError('Authentication failed. Please try again.');
            }
        } catch (error) {
            console.error('Sign-in failed', error.response.data);
            setError('Sign-in failed. Please check your credentials.');
        }
    };
    // 4 - Perform redirection to the '/posts' page if redirectToPosts is true
    if (redirectToPosts) {
        return <Navigate to="/posts" replace />;
    }
    // 5 - Otherwise render the sign up form
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

export default SignIn;
