import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeletePost from './DeletePost';
import AddComment from './AddComment';

// 1 - Pexels API key and endpoint for fetching random images
const API_KEY = 'cLDno3CrKltLF8YOqniPP21W9zwQSokdjiQPyNrwaqKzLjj1hjDUrdwV';
const API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';
// 2 - token prop for authentication purposes
const PostDetails = ({ token }) => {
    // 3 - useParams to extract the post_id from the URL path and useNavigate to manage navigation.
    const { post_id } = useParams();
    const navigate = useNavigate();
    // 4 - state variables
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // 5 - Fetch the posts, comments data from the server and images from pexel
    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `https://brivity-react-exercise.herokuapp.com/posts/${post_id}`,
                {
                    headers: { Authorization: token },
                }
            );
            const { data } = response;
            setPost(data.post);
        } catch (error) {
            console.error('Failed to fetch post', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(
                `https://brivity-react-exercise.herokuapp.com/posts/${post_id}/comments`
            );
            setComments(response.data.comments);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch comments', error);
            setError('Failed to fetch comments');
        }
    };

    const fetchRandomImage = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}random`, {
                headers: {
                    Authorization: API_KEY,
                },
            });

            if (response.data && response.data.photos && response.data.photos.length > 0) {
                const imageUrl = response.data.photos[0].src.original;
                setImageUrl(imageUrl);
            }
        } catch (error) {
            console.log('Failed to fetch random image', error);
        }
    };
    // Fetch post data, comments, and random image on component mount
    useEffect(() => {
        fetchPost();
        fetchRandomImage();
        fetchComments();
    }, [post_id]);

    const handleCommentAdded = (comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };

    const handleEditPost = () => {
        navigate(`/edit/${post_id}`);
    };

    const handlePostDeleted = () => {
        navigate('/posts');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!post) {
        return null; // Return null or a loading indicator if the post is not available
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md">
                <img
                    src={imageUrl}
                    alt={post.title}
                    className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <div>
                            <Link
                                to={`/edit/${post_id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Edit
                            </Link>
                            <DeletePost postId={post_id} token={token} onDelete={handlePostDeleted} />
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">{post.content}</p>
                    <div className="border-t border-gray-300 py-4">
                        <h3 className="text-lg font-semibold mb-2">Comments</h3>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="mb-4">
                                    <p className="text-gray-600 mb-1">{comment.content}</p>
                                    <p className="text-gray-500">By: {comment.user.display_name}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                    <AddComment token={token} postId={post_id} onCommentAdded={handleCommentAdded} />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
