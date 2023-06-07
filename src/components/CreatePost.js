import React, { useState } from 'react';
import axios from 'axios';

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

export default CreatePost;
