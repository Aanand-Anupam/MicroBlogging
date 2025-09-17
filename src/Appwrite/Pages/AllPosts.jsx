import React, { useState, useEffect } from 'react'
import PostCard from "../../components/PostCard"
import Appwrite_service from '../config';
function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        setError(null);
        Appwrite_service.listBlog()
            .then((posts) => {
                if (posts && posts.documents) {
                    setPosts(posts.documents);
                    setLoading(false);

                }
            })

            .catch((err) => {
                setError("Failed to load All Posts")
                setLoading(false);
                console.log("Error while loading All Posts", err)
            })

    },
        [])
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">All Blog Posts</h1>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 animate-pulse rounded-xl shadow-md p-4"
                        >
                            <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center text-red-500 text-lg">
                    {error}
                    <button
                        onClick={() => window.location.reload()}
                        className="ml-2 text-blue-500 underline hover:text-blue-600"
                    >
                        Retry
                    </button>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                    No posts available.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="transform transition-transform duration-200 hover:scale-105"
                        >
                            <PostCard {...post} />

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllPosts