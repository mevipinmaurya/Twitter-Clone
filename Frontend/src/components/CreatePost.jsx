import React, { useState } from 'react'
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"
import { FaImage } from "react-icons/fa6";
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { TWEET_API_ENDPOINT } from "../utils/Constant"
import { getAllTweets, getIsActive, getRefresh } from '../redux/TweetSlice'
import cover from "../assets/cover.png"

const CreatePost = () => {

    const [image, setImage] = useState(false);
    const [displayImage, setDisplayImage] = useState(false);

    const [description, setDescription] = useState("")

    const { user } = useSelector(store => store.user)
    const { isActive } = useSelector(store => store.tweet)

    // console.log(user?._id)
    const id = user?._id

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id)
        formData.append("description", description)
        formData.append("image", image)
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, formData, { withCredentials: true })

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(getRefresh())
                setDescription("")
                setImage(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error")
        }
    }

    const forYouHandler = () => {
        dispatch(getIsActive(true))
    }
    const followingHandler = () => {
        dispatch(getIsActive(false))
    }


    // const URL = "http://localhost:3000/images";
    // console.log(image.name);
    // console.log(`${URL}/${image.name}`)


    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className='flex justify-between items-center border-b border-b-gray-100 dark:border-[#202327]'>
                    <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : null} hover:bg-gray-200 hover:dark:bg-[#202327] rounded-sm w-full py-3 text-center`}>
                        <h1 className='font-semibold text-lg text-gray-700 dark:text-white cursor-pointer'>For You</h1>
                    </div>
                    <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : null} hover:bg-gray-200 hover:dark:bg-[#202327] rounded-sm w-full py-3 text-center`}>
                        <h1 className='font-semibold text-lg text-gray-700 dark:text-white cursor-pointer'>Following</h1>
                    </div>
                </div>
            </div>


            <div className='mt-5 mb-4'>
                <form onSubmit={submitHandler} className='border border-b-gray-200 dark:border-[#202327] border-l-0 border-r-0 border-t-0'>
                    <div className='flex items-center px-10'>
                        <div>
                            <Avatar src={vipin} size="45" round={true} />
                        </div>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none border-none ml-3 text-xl w-full dark:bg-transparent' type="text" placeholder='What is happening?!' />
                    </div>
                    <div className='px-10 mt-4'>
                        <img src={`${displayImage}`} alt="file_post" className={`w-[80px] cursor-pointer h-[60px] ${image ? "" : "hidden"}`} />
                    </div>
                    <div className='w-full flex justify-between mt-1 mb-5 px-10 items-center'>
                        <div>
                            <label htmlFor="file-input">
                                <p className='text-xl font-bold cursor-pointer hover:scale-110 text-[#1D9BF0]'><FaImage /></p>
                            </label>
                            <input onChange={(e) => {
                                setImage(e.target.files[0]);
                                setDisplayImage(URL.createObjectURL(e.target.files[0]))}} type="file" id='file-input' hidden />
                        </div>
                        <button type='submit' className='px-3 py-2 text-center text-lg outline-none border-none rounded-full bg-[#1D9BF0] text-white w-20'>Post</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default CreatePost