import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const LeftSidebar = () => {

    const { user } = useSelector(store => store.user)

    return (
        <div className='w-[20%]'>
            <div className='w-full px-3'>
                <div className='px-4'>
                    <span className='text-3xl'><FaXTwitter /></span>
                </div>
                <div className='my-4'>
                    <Link to={"/"} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><GoHome /></span>
                        <p className='font-bold text-md ml-3'>Home</p>
                    </Link>
                    <Link to={"/explore"} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><CiHashtag /></span>
                        <p className='font-bold text-md ml-3'>Explore</p>
                    </Link>
                    <Link to={"/notification"} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><IoIosNotificationsOutline /></span>
                        <p className='font-bold text-md ml-3'>Notifications</p>
                    </Link>
                    <Link to={"/bookmark"} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><CiBookmark /></span>
                        <p className='font-bold text-md ml-3'>Bookmark</p>
                    </Link>
                    <Link to={`/profile/${user?._id}`} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><CiUser /></span>
                        <p className='font-bold text-md ml-3'>Profile</p>
                    </Link>
                    <div className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><AiOutlineLogout /></span>
                        <p className='font-bold text-md ml-3'>logout</p>
                    </div>
                    <div>
                        <button className='px-2 py-2 bg-[#1D9BF0] text-md text-white w-full font-bold rounded-full'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar