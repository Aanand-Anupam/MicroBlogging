import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config_like_service from '../config_like';

function Like_btn({ blogId, userId }) {
    const [cnt, setCnt] = useState(0);
    const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the post

    useEffect(() => {
        async function likeupdate() {
            const count = await config_like_service.countLike({ blogId });
            setCnt(count);
        }

        likeupdate();
    }, [blogId, userId]);

    async function handleClick() {
        await config_like_service.createLike({ blogId, userId });
        setIsLiked(!isLiked);
        const count = await config_like_service.countLike({ blogId });
        setCnt(count);
    }

    return (
        <div className="flex items-center mt-2">
            <button
                type="button"
                onClick={handleClick}
                className={`flex items-center space-x-1 focus:outline-none transition-transform duration-200 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:scale-110`}
            >
                {isLiked ? (
                    <FaHeart className="w-6 h-6" />
                ) : (
                    <FaRegHeart className="w-6 h-6" />
                )}
                <span className="text-sm font-medium">{cnt}</span>
            </button>
        </div>
    );
}

export default Like_btn;