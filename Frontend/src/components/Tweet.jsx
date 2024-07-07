import React from 'react'
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"
import { BiCommentDetail } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from 'axios';
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/TweetSlice';
import { timeSince } from '../utils/Constant';


const Tweet = ({ tweet }) => {
    // console.log(tweet)

    const URL = "http://localhost:3000/images"

    const { user } = useSelector(store => store.user);
    const userId = user?._id
    // console.log(user.bookmarks.includes(tweet?._id))

    const dispatch = useDispatch()

    // Like or dislike the tweet
    const likeDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`, { id: userId }, { withCredentials: true })

            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error("Error")
        }
    }

    // Deleting the tweet
    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`, { withCredentials: true })

            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error("Error")
        }
    }

    // Adding tweet to the bookmark
    const bookmarkHandler = async (id) => {
        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/bookmark/${id}`, { id: userId }, { withCredentials: true })

            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error("Error")
        }
    }


    return (
        <div>
            <div className='border-b border-gray-200'>
                <div className='flex items-center w-full gap-4 p-4'>
                    <Avatar src={vipin} size="40" round={true} />
                    <div className='w-full'>

                        <div className='flex gap-3 items-center'>
                            <h1 className='font-semibold text-lg'>{tweet?.userDetails[0]?.name}</h1>
                            <p className='text-sm text-gray-500 '>@{tweet?.userDetails[0]?.username} &nbsp; &nbsp;{timeSince(tweet?.createdAt)}</p>
                        </div>

                        <div>
                            <p className='text-md'>{tweet?.description}</p>
                        </div>
                    </div>

                </div>
                {
                    tweet?.image
                        ? (<div className='w-full p-3'>
                            <img className='rounded-lg w-full h-[300px]' src={`${URL}/${tweet?.image}`} alt="" />
                        </div>)
                        : <></>
                }

                <div className='w-full p-4'>
                    <div className='flex justify-between w-full mt-4'>
                        <div className='text-2xl items-center cursor-pointer flex'>
                            <div className='p-2 hover:bg-green-100 rounded-full'>
                                <BiCommentDetail />
                            </div>
                            <p className='text-lg'>0</p>
                        </div>
                        <div className='text-2xl items-center cursor-pointer flex'>
                            <div onClick={() => likeDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-100 rounded-full'>
                                <CiHeart />
                            </div>
                            <p className='text-lg'>{tweet?.likes?.length}</p>
                        </div>
                        <div className='text-2xl items-center cursor-pointer flex'>
                            <div onClick={() => bookmarkHandler(tweet?._id)} className='p-2 hover:bg-yellow-100 rounded-full'>
                                {
                                    user?.bookmarks?.includes(tweet?._id)
                                        ? <IoBookmark />
                                        : <CiBookmark />
                                }
                            </div>
                            {/* <p className='text-lg'>{user?.bookmarks?.length}</p> */}
                        </div>

                        {
                            user?._id === tweet?.userId && (
                                <div className='text-2xl items-center cursor-pointer flex'>
                                    <div onClick={() => deleteTweetHandler(tweet?._id)} className='p-2 hover:bg-red-100 rounded-full'>
                                        <MdDeleteOutline />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Tweet