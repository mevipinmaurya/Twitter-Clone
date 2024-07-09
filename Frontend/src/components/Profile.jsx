import React from 'react'
import cover from "../assets/cover.png"
import { SlCalender } from "react-icons/sl";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar'
import userImage from "../assets/user.png"
import useGetProfile from "../hooks/useGetProfile"
import { useDispatch, useSelector } from "react-redux"
import toast from 'react-hot-toast';
import axios from 'axios';
import { createdDate, USER_API_ENDPOINT } from '../utils/Constant';
import { followingUpdate, getProfileRefresh } from '../redux/UserSlice';
import { getRefresh } from '../redux/TweetSlice';
import Tweet from './Tweet';
import useGetLoggedinUserTweets from '../hooks/useGetLoggedinUserTweets';
import Modal from './Modal';

const Profile = () => {

    const URL = "http://localhost:3000/images";

    const { user, profile } = useSelector(store => store.user)

    const { myTweets } = useSelector(store => store.tweet)

    // console.log(profile)
    // console.log(user)

    // console.log(myTweets)

    const dispatch = useDispatch();

    const userId = useParams()
    // Custom Hooks
    useGetProfile(userId.id);

    // Getting user tweets on profile
    useGetLoggedinUserTweets(profile?._id)


    const followAndUnfollowHandler = async () => {
        if (user.following.includes(profile?._id)) {
            // unfollow
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${profile?._id}`, { id: user?._id }, { withCredentials: true })

                dispatch(followingUpdate(profile?._id))
                dispatch(getRefresh())
                dispatch(getProfileRefresh())
                if (res.data.success) {
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        else {
            // follow
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/follow/${profile?._id}`, { id: user?._id }, { withCredentials: true })

                dispatch(followingUpdate(profile?._id))
                dispatch(getProfileRefresh())
                dispatch(getRefresh())
                if (res.data.success) {
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
    }



    return (
        <div className=''>
            <div className='w-full border-b border-gray-200 dark:border-[#202327] '>
                <div className='flex items-center py-3 border-l border-r border-gray-100 dark:border-[#202327]'>
                    <Link to={"/"} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoArrowBackOutline size="24px" />
                    </Link>
                    <div className='ml-1'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 dark:text-[whitesmoke] text-sm'>{myTweets.length} Posts</p>
                    </div>
                </div>
                <div className='relative'>
                    <img className='h-[200px] w-full' src={cover} alt="" />

                    <div className='absolute top-[134px] left-3 border-4 border-white rounded-full'>
                        {
                            profile?.profileImage
                            ?<Avatar src={`${URL}/${profile?.profileImage}`} size="120" round={true} />
                            :<Avatar src={userImage} className='bg-white' size="120" round={true} />
                        }
                    </div>

                    <div className='flex justify-end mt-5'>
                        {
                            profile?._id === user?._id
                                ? (<Modal />)
                                : (<button onClick={followAndUnfollowHandler} className='px-5 py-2 border-[1px] text-white bg-black text-md rounded-full text-center' >{user.following.includes(profile?._id) ? "Following" : "Follow"}</button>)
                        }
                    </div>
                </div>
                <div className='m-4'>
                    <h1 className='text-xl font-bold'>{profile?.name}</h1>
                    <p>@{profile?.username}</p>
                    <div className='text-gray-800 dark:text-[#b1b1b1] mt-5'>
                        <p>{profile?.bio}</p>
                    </div>
                    <div className='flex mt-5 items-center gap-3'>
                        <p className='text-xl font-bold'><SlCalender /></p>
                        <p className='dark:text-[#b1b1b1]'><span className='text-lg dark:text-white font-semibold'>Joined</span> {createdDate((profile?.createdAt))}</p>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <div className='flex gap-2 items-center'>
                            <p className='text-lg font-bold'>{profile?.following.length}</p>
                            <p className='text-lg text-gray-800 dark:text-[#b1b1b1]'>Following</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <p className='text-lg font-bold'>{profile?.followers.length}</p>
                            <p className='text-lg text-gray-800 dark:text-[#b1b1b1]'>Followers</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full border border-gray-100 dark:border-[#202327]">
                {
                    myTweets?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
                }
            </div>
        </div>
    )
}

export default Profile