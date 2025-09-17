import React from "react";
import { Link } from "react-router-dom";

export default function Drawer({ authStatus, toggleDrawer }) {
    return (
        <div className="flex flex-col h-full p-4 bg-white">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
            <nav aria-label="Main navigation">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                            onClick={toggleDrawer}
                        >
                            Home
                        </Link>
                    </li>
                    {authStatus && (
                        <li>
                            <Link
                                to="/add-post"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                                onClick={toggleDrawer}
                            >
                                Add Post
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to={authStatus ? "/logout" : "/login"}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 rounded-md"
                            onClick={toggleDrawer}
                        >
                            {authStatus ? "Logout" : "Login"}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}