import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    // 1 - State variables for managing form inputs, redirection, and error handling
    const [displayName, setDisplayName] = useState('');
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
                    display_name: displayName,
                    email: email,
                    password: password,
                },
            };
            const response = await axios.post(
                'https://brivity-react-exercise.herokuapp.com/users',
                payload
            );

            if (response && response.headers && response.headers.authorization) {
                // 3 - If registration is successful, store the authorization token in localStorage
                const token = response.headers.authorization;
                localStorage.setItem('token', token);
                setRedirectToPosts(true); // Set redirectToPosts to true for redirection
            } else {
                setError('Authentication failed. Please try again.'); // Display an error message if no token is received
            }
        } catch (error) {
            console.error('Sign-up failed', error);
            setError('Sign-up failed. Please check your credentials and try again.'); // Display an error message if the request fails
        }
    };
    // 4 - Perform redirection to the '/posts' page if redirectToPosts is true
    if (redirectToPosts) {
        return <Navigate to="/posts" replace />;
    }
    // 5 - Otherwise render the sign up form
    // 6 - Each input field is bound to its corresponding state variable
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                {/* 7 - trigger the handleSubmit function when clicked */}
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

export default SignUp;
