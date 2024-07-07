import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Constant';
import { getMyProfile, getOtherUsers, getUser } from '../redux/UserSlice';
import { getAllTweets } from '../redux/TweetSlice';


const LeftSidebar = () => {

    const { user } = useSelector(store => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = async ()=>{
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`)
            dispatch(getUser(null))
            dispatch(getOtherUsers(null))
            dispatch(getMyProfile(null))
            dispatch(getAllTweets(null))
            navigate("/login")
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
            toast.error("Unable to logout")
        }
    }

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
                    <Link to={`/bookmarks/${user?._id}`} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><CiBookmark /></span>
                        <p className='font-bold text-md ml-3'>Bookmark</p>
                    </Link>
                    <Link to={`/profile/${user?._id}`} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                        <span className='text-xl'><CiUser /></span>
                        <p className='font-bold text-md ml-3'>Profile</p>
                    </Link>
                    <div onClick={logoutHandler} className='flex my-2 px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer rounded-full'>
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