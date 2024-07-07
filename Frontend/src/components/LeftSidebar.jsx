import React, { useEffect, useState } from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { MdOutlineCompost } from "react-icons/md";
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

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
    const element = document.documentElement;
    useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
            document.body.classList.add("dark");
        }
        else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark");
        }

    }, [theme])


    const { user } = useSelector(store => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = async () => {
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
        <div className='w-[8%]'>
            <div className='w-full px-3'>
                <div className='px-2'>
                    <span className='text-4xl'><FaXTwitter /></span>
                </div>
                <div className='my-4'>
                    <Link to={"/"} className='flex my-2 px-2 py-2 hover:cursor-pointer rounded-full'>
                        <span className='text-3xl font-bold'><GoHome /></span>
                    </Link>
                    <Link to={"/explore"} className='flex my-2 px-2 py-2 hover:cursor-pointer rounded-full'>
                        <span className='text-3xl font-bold'><CiHashtag /></span>
                    </Link>
                    <Link to={"/notification"} className='flex my-2 px-2 py-2 hover:cursor-pointer rounded-full'>
                        <span className='text-3xl font-bold'><IoIosNotificationsOutline /></span>
                    </Link>
                    <Link to={`/bookmarks/${user?._id}`} className='flex my-2 px-2 py-2 hover:cursor-pointer rounded-full'>
                        <span className='text-3xl font-bold'><CiBookmark /></span>
                    </Link>
                    <Link to={`/profile/${user?._id}`} className='flex my-2 px-2 py-2 hover:cursor-pointer rounded-full'>
                        <span className='text-3xl font-bold'><CiUser /></span>
                    </Link>

                    <div className='my-2 px-2 py-2 items-center cursor-pointer'>
                        <label className="swap swap-rotate">

                            {
                                theme === "dark"
                                    ? (<svg onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="swap-off fill-current w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>)
                                    : (
                                        <svg onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="swap-on fill-current w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                                    )
                            }

                        </label>
                    </div>


                    <div onClick={logoutHandler} className='flex my-2 px-2 py-2 hover:cursor-pointer rounded-full'>
                        <span className='text-3xl font-bold'><AiOutlineLogout /></span>
                    </div>

                    <Link to={"/"}>
                        <button className='px-3 py-3 text-white bg-[#1D9BF0] text-3xl  rounded-full font-bold'><MdOutlineCompost /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar