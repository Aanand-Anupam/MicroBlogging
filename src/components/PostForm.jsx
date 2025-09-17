import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Appwrite_file_service from '../Appwrite/config_file'
import Appwrite_service from '../Appwrite/config'
import Input from "./Input"
import RTE from "./RTE"
import { Button } from '@mui/material';
import { useCallback } from 'react';


export default function PostForm({ post }) {
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    // console.log("User Data from PostForm: ", userData);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || true,
            Name: post?.Name || ''
        }
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(null);
    const [videoLoading, setVideoLoading] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [videoError, setVideoError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageLoading(true);
            setImageError(null);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                handleImageLoad();
            }
            reader.onerror = () => {
                handleImageError();
                setImageLoading(false);
            }
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoLoading(true);
            setVideoError(null);
            const reader = new FileReader();

            reader.onload = () => {
                setVideoPreview(reader.result)
                handleVideoLoad();
            }
            reader.onerror = () => {
                handleVideoError();
                handleVideoLoad();
            }
            reader.readAsDataURL(file)
        } else {
            setVideoPreview(null);
        }
    }

    function handleImageLoad() {
        setImageLoading(false);
    }
    function handleVideoLoad() {
        setVideoLoading(false);
    }
    function handleImageError() {
        setImageError("Failed to Load Image");
    }
    function handleVideoError() {
        setVideoError("Failed to Load Video");
    }



    const submit = async (data) => {
        if (post) {
            let file, file2;
            if (data.attachedImage[0]) {

                file = await Appwrite_file_service.createFile(data.attachedImage[0]);
                if (file && post.attachedImage) {
                    await Appwrite_file_service.deleteFile(post.attachedImage);
                }

            }
            if (data.attachedVideo[0]) {
                file2 = await Appwrite_file_service.createFile(data.attachedVideo[0]);
                if (file2 && post.attachedVideo) {
                    await Appwrite_file_service.deleteFile(post.attachedVideo);
                }
            }
            const dbPost = await Appwrite_service.updateBlog(
                post.$id,
                {
                    ...data,
                    attachedImage: file ? file.$id : post.attachedImage,
                    attachedVideo: file2 ? file2.$id : post.attachedVideo,
                }
            )
            await new Promise(resolve => setTimeout(resolve, 500));
            if (dbPost) navigate(`/post/${dbPost.$id}`);


        } else {
            if (!userData) {
                navigate("/login");
            }
            let file, file2;
            if (data.attachedImage[0]) {

                file = await Appwrite_file_service.createFile(data.attachedImage[0]);

            }
            if (data.attachedVideo[0]) {
                file2 = await Appwrite_file_service.createFile(data.attachedVideo[0]);
            }

            console.log(userData);
            const dbPost = await Appwrite_service.createBlog(
                {
                    ...data,
                    attachedImage: file ? file.$id : null,
                    attachedVideo: file2 ? file2.$id : null,
                    userId: userData.$id
                }
            )
            if (dbPost && dbPost.$id) {
                console.log("See here pls.", dbPost);
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value.toLowerCase().replace(
                / /g, '-')
            setValue('slug', slug);
            return slug
        }
        else {
            return ''
        }
    }, [])
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == 'title') {
                setValue('slug', slugTransform(value.title),
                    { shouldValidate: true }
                )
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);



    return (
        <>
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
                <div className='w-2/3 px-2'>
                    <Input
                        label="Title"
                        placeholde="Blog Title"
                        {
                        ...register(
                            "title", {
                            required: true
                        }
                        )
                        }
                    />
                    <Input
                        label="Slug"
                        placeholde=""
                        {
                        ...register(
                            "slug", {
                            required: true
                        })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value),
                                {
                                    shouldValidate: true
                                })
                        }}
                    />
                    <Input
                        label="Creator Name"
                        placeholde="Name of Author"
                        {
                        ...register(
                            "Name", {
                            required: true
                        })}
                    />
                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValues={getValues("content")}
                    />
                </div>
                <div className='w-1/3 px-2'>
                    <Input
                        label="AttachedImage"
                        type='file'
                        className="mb-4"
                        onChange={handleImageChange}
                        accept='image/png image/jpg image/jpeg image/gif'
                        {
                        ...register(
                            "attachedImage", {
                            required: !post
                        }
                        )
                        }
                    />
                    <Input
                        label="AttachedVideo"
                        type="file"
                        className="mb-4"
                        onChange={handleVideoChange}
                        accept="video/mp4,video/webm,video/ogg"
                        {
                        ...register(
                            "attachedVideo", {
                            required: false
                        }
                        )
                        }
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Media Preview</h3>
                    <div className="space-y-4">
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                {imageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                                        <svg
                                            className="animate-spin h-6 w-6 text-blue-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    className="w-full object-cover rounded-xl"
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                                {imageError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-75 text-red-700 text-sm">
                                        {imageError}
                                    </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                                    Image Preview
                                </div>
                            </div>
                        )}
                        {/* Video Preview */}
                        {videoPreview && (
                            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                {videoLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                                        <svg
                                            className="animate-spin h-6 w-6 text-blue-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <video
                                    src={videoPreview}
                                    controls
                                    className="w-full rounded-xl"
                                    onLoadedData={handleVideoLoad}
                                    onError={handleVideoError}
                                />
                                {videoError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-75 text-red-700 text-sm">
                                        {videoError}
                                    </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                                    Video Preview
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        {...register("status", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>


                <Button variant="contained" color="success" type='submit' className='px-2 py-1'>
                    {post ? 'Update' : 'Submit'}
                </Button>

            </form>
        </>
    )
}