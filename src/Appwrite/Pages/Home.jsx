import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Appwrite_service from "../config"
import PostCard from '../../components/PostCard';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => async function fetchBlogs() {
        setLoading(true);
        setError(null);
        try {

            const posts = await Appwrite_service.listBlog();

            if (posts && posts.documents) {
                setPosts(posts.documents);
                setLoading(false);
            }

        }
        catch (err) {
            setError("Failed to Load Posts. ")
            setLoading(false);
            console.log("Error while Loading Posts. ", err)
        }
        setLoading(false);
    },
        [])

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Explore Posts</h1>
            <div className="max-w-2xl mx-auto">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                <div className="h-48 bg-gray-200 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            aria-label="Retry loading posts"
                        >
                            Retry
                        </button>
                    </div>
                ) : posts.length === 0 ? (

                    <div className="text-center text-gray-500 text-lg">
                        No posts available.
                    </div>

                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
} 