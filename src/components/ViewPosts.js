import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import { Link, useNavigate } from 'react-router-dom';

const ViewPosts = ({ token }) => {
    const [posts, setPosts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                'https://brivity-react-exercise.herokuapp.com/posts?_sort=createdAt:asc',
                {
                    headers: { Authorization: token },
                }
            );
            const { data } = response;
            setPosts(data.posts);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = () => {
        setShowCreateForm(true);
    };

    const handlePostCreated = (newPost) => {
        setPosts([...posts, newPost]);
        setShowCreateForm(false);
    };

    const handleCommentAdded = (postId, comment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, comments: [...(post.comments || []), comment] } : post
            )
        );
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
                {showCreateForm ? (
                    <CreatePost
                        token={token}
                        onPostCreated={handlePostCreated}
                        onCancel={() => setShowCreateForm(false)}
                    />
                ) : (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreatePost}
                    >
                        Create Post
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <Post post={post} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPosts;
