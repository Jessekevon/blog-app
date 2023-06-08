import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, token, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(
                `https://brivity-react-exercise.herokuapp.com/posts/${postId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onDelete(); // Call the onDelete function passed as a prop
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    return (
        <div>
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Delete
            </button>
        </div>
    );
};

export default DeletePost;
