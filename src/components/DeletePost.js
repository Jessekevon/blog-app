import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, token }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(
                `https://brivity-react-exercise.herokuapp.com/posts/${postId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onDelete();
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    return (
        <div>
            <h2>Delete Post</h2>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeletePost;
