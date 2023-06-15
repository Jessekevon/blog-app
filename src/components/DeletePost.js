import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, token, onDelete }) => {
    const handleDelete = async () => {
        try {
            // 2 - Send a DELETE request to delete the specified post
            await axios.delete(
                `https://brivity-react-exercise.herokuapp.com/posts/${postId}`,
                {
                    headers: { Authorization: token },
                }
            );
            // 3 - Call the onDelete function passed as a prop
            onDelete(); 
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
