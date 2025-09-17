import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import App from './App.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from "./Appwrite/Pages/Login.jsx"
import Signup from './components/Signup.jsx'
import EditPost from "./Appwrite/Pages/EditPost.jsx"
import AddPost from "./Appwrite/Pages/AddPost.jsx"
import ALlPosts from "./Appwrite/Pages/AllPosts.jsx"
import Post from "./Appwrite/Pages/Post.jsx"
import Home from "./Appwrite/Pages/Home.jsx"
import Logout from './components/Logout.jsx'
import MyPost from "./Appwrite/Pages/MyPosts.jsx"
import LikedPost from "./Appwrite/Pages/LikedPost.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />

      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          // <AuthLayout authentication={false}>
          <ALlPosts />
          // </AuthLayout>
        )
      },
      {
        path: "add-post",
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "favorite-posts",
        element: (
          <AuthLayout authentication={true}>
            <LikedPost />
          </AuthLayout>
        )
      },
      {
        path: '/my-posts',
        element: (
          <AuthLayout authentication={true}>
            <MyPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
      {
        path: '/logout',
        element: <Logout />
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </StrictMode>,
)
