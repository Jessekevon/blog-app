import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPosts = ({ token }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                'https://brivity-react-exercise.herokuapp.com/posts',
                {
                    headers: { Authorization: `Bearer ${token}` },
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

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="h-48 w-full object-cover rounded-t-lg"
                        />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                            <p className="text-gray-600">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPosts;
