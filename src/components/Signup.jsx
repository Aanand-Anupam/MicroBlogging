import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../Appwrite/auth'
import Input from './Input';
import { login as userLogin } from '../store/authSlice';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const sign = async (data) => {
        setError("");
        // if (formData.password !== formData.confirmPassword) {
        //     alert("Passwords do not match!");
        //     return;
        // }
        try {

            await authService.createAccount(data);
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(userLogin({ userData: userData, status: true }));
                navigate('/');
            }

        } catch {
            setError(error);
            console.log("Error signing up: ", error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">


                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign up</h2>

                <form onSubmit={handleSubmit(sign)} className="space-y-4">
                    <Input
                        type="text"
                        label="name"
                        placeholder="Name"
                        {
                        ...register("name",
                            {
                                required: true
                            }
                        )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <Input
                        type="email"
                        label="email"
                        placeholder="your@email.com"
                        {
                        ...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"

                    />

                    <input
                        type="password"
                        label="password"
                        placeholder="Password"
                        {
                        ...register("password", {
                            required: true,
                            minLength: 8,
                            message: "Password must be at least 8 characters long"
                        })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"

                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"

                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="accent-blue-500 mr-2"
                            id="remember"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-400">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
                    >
                        Sign up
                    </button>

                </form>

                <p className="text-sm text-gray-600 text-center mt-6">

                    <span className="mt-2 text-center text-base text-black/60">
                        Already have an account?{' '}
                        <Link
                            to='/login'
                            className="text-blue-600 font-medium hover:underline">
                            Sign in
                        </Link>
                    </span>
                </p>

                {/* <div className="flex items-center gap-4 my-6">
                    <hr className="flex-1 border-gray-700" />
                    <span className="text-gray-500 text-sm">or</span>
                    <hr className="flex-1 border-gray-700" />
                </div>

                <button className="w-full flex items-center justify-center gap-3 border border-[#30363D] text-white py-2 rounded-lg hover:bg-[#21262D] transition">
                    <FcGoogle className="text-xl" />
                    Sign up with Google
                </button>

                <button className="w-full mt-3 flex items-center justify-center gap-3 border border-[#30363D] text-white py-2 rounded-lg hover:bg-[#21262D] transition">
                    <FaFacebookF className="text-blue-500 text-xl" />
                    Sign up with Facebook
                </button> */}
            </div>
        </div >
    );
}
export default Signup;