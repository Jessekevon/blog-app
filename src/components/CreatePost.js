import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ token }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            // Handle the case where the token is missing
            setError('Authentication failed. Please sign in again.');
            return;
        }

        try {
            const response = await axios.post(
                'https://brivity-react-exercise.herokuapp.com/posts',
                {
                    post: {
                        title,
                        body,
                    },
                },
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
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while creating the post.');
            }
            console.log('Failed to create post', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl text-white font-semibold mb-4">Create Post</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
