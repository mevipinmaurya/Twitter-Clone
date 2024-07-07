import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './Login'
import Home from './Home'
import Feed from './Feed'
import Profile from './Profile'
import Bookmark from './Bookmark'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "/profile/:id",
                    element: <Profile />
                },
                {
                    path: "/bookmarks/:id",
                    element: <Bookmark />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body