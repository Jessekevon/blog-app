import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeletePost from './DeletePost';

const API_KEY = 'cLDno3CrKltLF8YOqniPP21W9zwQSokdjiQPyNrwaqKzLjj1hjDUrdwV';
const API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';

const PostDetails = ({ postId, token }) => {
    const { post_id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `https://brivity-react-exercise.herokuapp.com/posts/${post_id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const { data } = response;
            setPost(data.post);
        } catch (error) {
            console.error('Failed to fetch post', error);
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

    useEffect(() => {
        fetchPost();
        fetchRandomImage();
    }, [post_id]);

    const handleEditPost = () => {
        navigate(`/edit/${post_id}`);
    };

    const handlePostDeleted = () => {
        navigate('/posts');
    };

    if (!post) {
        return <div>Loading...</div>;
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
                    <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                    <p className="text-gray-600">{post.content}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
                        onClick={handleEditPost}
                    >
                        Edit
                    </button>
                    <DeletePost postId={post_id} token={token} onDelete={handlePostDeleted} />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
