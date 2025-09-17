import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../Appwrite/auth';
import { login as userLogin } from '../store/authSlice';
import Input from './Input';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState("");


    const login = async (data) => {
        console.log("Login data:", data);
        setError(null);

        try {

            await authService.loginAccount(data);

            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(userLogin({ userData: userData, status: true }));
                navigate('/');
            }
            else {
                setMsg("User not Authenticated ! Pls Sign in");
                await new Promise(resolve => setTimeout(resolve, 1200));
                navigate("/signup");
            }
        } catch (error) {
            setError(error.message);
            console.error('Login error:', error);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

                <form onSubmit={handleSubmit(login)} className="space-y-5">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            message: "Password must be at least 8 characters long"
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />

                    {/* <Input
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                    /> */}

                    <div className="flex items-center">
                        <Input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                            id="remember"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-6">
                    <span>
                        Don't have any account?{' '}
                        <Link
                            to='/signup'
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </span>
                </p>

                {msg && (
                    <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
                        {msg}
                    </div>
                )}

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
        </div>
    );
}

export default Login;