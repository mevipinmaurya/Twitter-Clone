import React from 'react'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex justify-between w-[85%] mx-auto pt-3'>
            <LeftSidebar />
            {/* <Feed /> */}
            <Outlet />
            <RightSidebar />
        </div>
    )
}

export default Home