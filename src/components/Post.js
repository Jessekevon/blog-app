import React from 'react';

const Post = ({ post, token }) => {
    return (
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
    );
};

export default Post;
