import React, { useState, useEffect } from 'react'
import PostForm from '../../components/PostForm'
import Appwrite_file_service from '../config_file'
import Appwrite_service from '../config'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function EditPost() {
    const { slug } = useParams();
    // console.log(slug);
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        Appwrite_service.getBlog(slug)
            .then((post) => {
                if (post) {
                    if (post.userId === userData.$id) {
                        // console.log(post);
                        setPost(post)
                        setLoading(false)
                    } else {
                        setError("Not Authorized")
                        setLoading(false);
                        setTimeout(() => navigate("/"), 3000);
                    }
                }
                else {
                    navigate("/");
                }
            })
            .catch((err) => {
                setError("Unable to edit Post");
                console.log("Error Generated while trying to edit post", err);
                setLoading(false);
            })
    },
        [slug, navigate, userData])
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Edit Your Post</h1>
            {loading ? (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 animate-pulse">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-2/3 px-2">
                            <div className="h-10 bg-gray-200 rounded mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded mb-4"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <div className="h-10 bg-gray-200 rounded mb-4"></div>
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded mb-4"></div>
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded mb-4"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        aria-label="Retry loading post"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
                    <PostForm post={post} />
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 text-blue-500 hover:text-blue-600 underline"
                        aria-label="Go back to homepage"
                    >
                        Back to Home
                    </button>
                </div>
            )}
        </main>
    )
}