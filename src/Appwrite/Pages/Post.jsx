import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Appwrite_service from "../config"
import Appwrite_file_service from '../config_file';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imgurl, setImgurl] = useState();
    const [vidurl, setVidurl] = useState();
    const [name, setName] = useState('Anonymous');
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        setLoading(true);
        setError(null);
        if (slug) {
            Appwrite_service.getBlog(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError("Failed to Load Post")
                    setTimeout(() => navigate("/"), 3000);
                }
            })
        } else {
            navigate("/");
        }
    }, [slug, navigate])

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const deletePost = () => {
        try {
            if (post) {
                Appwrite_service.deleteBlog(slug).then((status) => {
                    if (status) {
                        if (post.attachedImage)
                            Appwrite_file_service.deleteFile(post.attachedImage);
                        if (post.attachedVideo)
                            Appwrite_file_service.deleteFile(post.attachedVideo);
                        navigate("/");
                    }
                })
            }
        } catch (error) {
            setError("Failed to delete Blog")
            console.log("Error while deleting Blog", error);
        }
    }

    async function imgUrl() {
        const res = await Appwrite_file_service.getFileView(post.attachedImage);
        setImgurl(res);

    }
    async function vidUrl() {
        const res2 = await Appwrite_file_service.getFileView(post.attachedVideo);
        setVidurl(res2);
    }
    if (post && post.attachedImage) imgUrl();
    if (post && post.attachedVideo) vidUrl();


    async function fetchUserName() {
        const userName = await Appwrite_service.getUserName(post.userId);
        if (userName) setName(userName);
    }
    if (post && post.userId) {
        fetchUserName();
    }

    return (

        <main className="container mx-auto px-4 py-8">
            {loading ? (
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="flex items-center mb-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-full mr-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                </div>
            ) : error ? (
                <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        aria-label="Retry loading post"
                    >
                        Retry
                    </button>
                </div>
            ) : post ? (

                <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <div className="h-12 w-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600">
                            {name[0].toUpperCase()}
                        </div>
                        <span className="text-gray-600 font-medium">
                            @{name || "user"}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
                    {post.attachedImage && (
                        <div className="mb-6">
                            <img
                                src={imgurl}
                                alt={post.title || "Post image"}
                                className="w-full h-64 object-cover rounded-lg"
                                loading="lazy"
                            />
                        </div>
                    )}
                    {post.attachedVideo && (
                        <div className="mb-6">
                            <video
                                src={vidurl}
                                controls
                                className="w-full h-64 object-cover rounded-lg"
                                aria-label={post.title || "Post video"}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                    <div className="prose prose-lg text-gray-700 mb-6">
                        {parse(post.content)}
                    </div>
                    {isAuthor && (
                        <div className="flex space-x-4">
                            <button
                                onClick={deletePost}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                aria-label="Delete post"
                            >
                                Delete Post
                            </button>
                            <Link
                                to={`/edit-post/${post.$id}`}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                aria-label="Edit post"
                            >
                                Edit Post
                            </Link>
                        </div>
                    )}
                </article>
            ) : null}
        </main>
    );

}

export default Post;