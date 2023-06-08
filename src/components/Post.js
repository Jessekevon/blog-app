import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'cLDno3CrKltLF8YOqniPP21W9zwQSokdjiQPyNrwaqKzLjj1hjDUrdwV';
const API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';

const Post = ({ post }) => {
    const [imageUrl, setImageUrl] = useState('');

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
        fetchRandomImage();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md">
            <img
                src={imageUrl}
                alt={post.title}
                className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600">{post.content}</p>
            </div>
        </div>
    );
};

export default Post;
