import React, { useState } from 'react';
import axios from 'axios';

const AddComment = ({ token, postId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [error, setError] = useState('');

    const handleCommentChange = (event) => {
        setContent(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'https://brivity-react-exercise.herokuapp.com/comments',
                {
                    comment: {
                        post_id: postId,
                        content: content,
                    },
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const newComment = response.data.comment;
            onCommentAdded(newComment);
            setContent('');
            setError('');
        } catch (error) {
            console.log('Failed to create comment', error);
            setError('Failed to create comment');
        }
    };

    const handleCommentEdit = async (commentId) => {
        setEditingCommentId(commentId);
        // Fetch the existing comment content or display a form to edit it
        // You can implement this part as per your requirement
    };

    const handleCommentUpdate = async (commentId, updatedContent) => {
        try {
            const response = await axios.patch(
                `https://brivity-react-exercise.herokuapp.com/comments/${commentId}`,
                {
                    comment: {
                        content: updatedContent,
                    },
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const updatedComment = response.data.comment;
            // Update the comment in the comments state or refetch the comments
            // You can implement this part as per your requirement
            setEditingCommentId(null);
            setError('');
        } catch (error) {
            console.log('Failed to update comment', error);
            setError('Failed to update comment');
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await axios.delete(`https://brivity-react-exercise.herokuapp.com/comments/${commentId}`, {
                headers: {
                    Authorization: token,
                },
            });

            // Remove the comment from the comments state or refetch the comments
            // You can implement this part as per your requirement
            setError('');
        } catch (error) {
            console.log('Failed to delete comment', error);
            setError('Failed to delete comment');
        }
    };

    return (
        <div>
            <h3>Add a Comment</h3>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleCommentSubmit}>
                <textarea value={content} onChange={handleCommentChange} />
                <button type="submit">Add Comment</button>
            </form>

            {/* Render the existing comments here and provide the edit and delete functionality */}
        </div>
    );
};

export default AddComment;
