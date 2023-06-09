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
        <div>
            <h2>Create Post</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;
