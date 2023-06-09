import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// 1 - It receives the postId and token as props from its parent component.
const EditPost = ({ postId, token }) => {
    // 2 - It uses the useParams hook from React Router to extract the post_id parameter from the URL.
    const { post_id } = useParams();
    const navigate = useNavigate(); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // 3 - The useEffect hook is used to fetch the post data from the server when the component mounts.
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `https://brivity-react-exercise.herokuapp.com/posts/${post_id}`,
                    {
                        headers: { Authorization: token },
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
    }, [token, post_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 4 - Send a PATCH request to update the post with the new title and content
            await axios.patch(
                `https://brivity-react-exercise.herokuapp.com/posts/${post_id}`,
                {
                    post: {
                        title,
                        content
                    }
                },
                {
                    headers: { Authorization: token },
                }
            );
            // 5 - Navigate to the updated post's page
            navigate(`/posts/${post_id}`); 
        } catch (error) {
            console.error('Failed to edit post', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full py-2 px-4 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full py-2 px-4 mb-4 rounded border border-gray-300 h-40 resize-none focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditPost;
