import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUsers from '../hooks/useOtherUsers'
import useGetMyTweets from '../hooks/useGetMyTweets'
import "./Style.css"

const Home = () => {
    const { user, otherUsers } = useSelector(store => store.user)

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    // Custom hooks
    useOtherUsers(user?._id)
    useGetMyTweets(user?._id)

    return (
        <div className='flex justify-between w-[85%] mx-auto pt-3'>
            <LeftSidebar />
            <div id='midSection' className='w-[62%] h-screen'>
                <Outlet />
            </div>
            <RightSidebar otherUsers={otherUsers} />
        </div>
    )
}

export default Home