import React from 'react';
import ViewPosts from './ViewPosts';

const HomePage = ({ token }) => {
    return (
        <div className="bg-gray-800">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white">
                        Welcome to the Blog App
                    </h1>
                </div>
            </div>
            <ViewPosts token={token} />
        </div>
    );
};

export default HomePage;
