import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppwritefileService from '../Appwrite/config_file';
import Appwrite_service from '../Appwrite/config';
import Like_btn from '../Appwrite/Pages/Like_btn';
//TODO: Can we replace downloadFile method with file preview method:

function PostCard({ $id, title, attachedImage, userId }) {
    const [url, setUrl] = useState();
    const [name, setName] = useState('A');
    useEffect(() => {
        async function imgUrl() {
            const res = await AppwritefileService.getFileView(attachedImage);
            setUrl(res);
        }
        imgUrl();
    }, [attachedImage])

    useEffect(() => {
        async function fetchUserName() {
            const userName = await Appwrite_service.getUserName(userId);
            setName(userName);
        }
        if (userId) {
            fetchUserName();

        }
    }, [userId])

    return (
        <>
            <Link to={`/post/${$id}`} className="block max-w-sm w-full">
                <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <div className="flex items-center mb-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg">
                            {name[0].toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                            {name || 'Unknown User'}
                        </div>
                    </div>
                    <div className="h-6 rounded mb-2">
                        <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-600 truncate">
                            {title}
                        </h2>
                    </div>

                    <div className="h-48 rounded-lg overflow-hidden relative group">
                        <img
                            src={url}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                    </div>
                </div>
            </Link>
            < Like_btn blogId={$id} userId={userId} />
        </>

    );
}

export default PostCard;
