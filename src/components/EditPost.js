import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = ({ postId, token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `https://brivity-react-exercise.herokuapp.com/posts/${postId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const { title, content } = response.data.post;
                setTitle(title);
                setContent(content);
            } catch (error) {
                console.error('Failed to fetch post', error);
            }
        };

        fetchPost();
    }, [postId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `https://brivity-react-exercise.herokuapp.com/posts/${postId}`,
                {
                    post: {
                        title,
                        content
                    }
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // Set any state for editing mode if needed
        } catch (error) {
            console.error('Failed to edit post', error);
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
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
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
