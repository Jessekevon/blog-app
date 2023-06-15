import React, { useState } from 'react';
import axios from 'axios';

// 1 - The CreatePost component receives a token prop, which is used for authentication purposes
const CreatePost = ({ token }) => {
    // 2 - State variables for the post title, body, and error messages
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    // 3 - Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if the token is missing
        if (!token) {
            // Handle the case where the token is missing
            setError('Authentication failed. Please sign in again.');
            return;
        }

        try {
            // Send a POST request to create a new post
            const response = await axios.post(
                'https://brivity-react-exercise.herokuapp.com/posts',
                {
                    post: {
                        title,
                        body,
                    },
                },
                // Includes the token in the request headers for authentication
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            console.log('Created post:', response.data);
            // Reset the form fields
            setTitle('');
            setBody('');
            setError('');
        } catch (error) {
            // Handle errors during post creation
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while creating the post.');
            }
            console.log('Failed to create post', error);
        }
    };
    // Render the form to create a new post
    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl text-white font-semibold mb-4">Create Post</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {/* The form's submit event is handled by the handleSubmit function */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="text-white">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full py-2 px-4 mt-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-white">Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full py-2 px-4 mt-1 rounded border border-gray-300 h-40 resize-none focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
