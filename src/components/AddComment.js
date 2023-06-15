import React, { useState } from 'react';
import axios from 'axios';
// 1 - takes three props token, postId, and comment handler
const AddComment = ({ token, postId, onCommentAdded }) => {
    // 2 - State variables to manage the content, editing ID, and error message
    const [content, setContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [error, setError] = useState('');
    // 3 - Update the content state when the user types in the comment input field
    const handleCommentChange = (event) => {
        setContent(event.target.value);
    };
    // 4 - Handle the submission of a new comment
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

    // TODO Editing and Updating Comments

    // Handle editing of a comment
    // const handleCommentEdit = async (commentId) => {
    //     setEditingCommentId(commentId);
    //     // Fetch the existing comment content or display a form to edit it
    //     // You can implement this part as per your requirement
    // };

    // const handleCommentUpdate = async (commentId, updatedContent) => {
    //     try {
    //         const response = await axios.patch(
    //             `https://brivity-react-exercise.herokuapp.com/comments/${commentId}`,
    //             {
    //                 comment: {
    //                     content: updatedContent,
    //                 },
    //             },
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );

    //         const updatedComment = response.data.comment;
    //         // Update the comment in the comments state or refetch the comments
    //         // You can implement this part as per your requirement
    //         setEditingCommentId(null);
    //         setError('');
    //     } catch (error) {
    //         console.log('Failed to update comment', error);
    //         setError('Failed to update comment');
    //     }
    // };

    // const handleCommentDelete = async (commentId) => {
    //     try {
    //         await axios.delete(`https://brivity-react-exercise.herokuapp.com/comments/${commentId}`, {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         // Remove the comment from the comments state or refetch the comments
    //         // You can implement this part as per your requirement
    //         setError('');
    //     } catch (error) {
    //         console.log('Failed to delete comment', error);
    //         setError('Failed to delete comment');
    //     }
    // };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
            {error && <p className="text-red-500 mb-2">Error: {error}</p>}
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    value={content}
                    onChange={handleCommentChange}
                    placeholder="Write your comment..."
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default AddComment;
