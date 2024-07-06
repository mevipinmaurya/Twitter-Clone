import React, { useState } from 'react'
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { TWEET_API_ENDPOINT } from "../utils/Constant"
import { getRefresh } from '../redux/TweetSlice'

const CreatePost = () => {

    const [description, setDescription] = useState("")

    const { user } = useSelector(store => store.user)
    // console.log(user?._id)
    const id = user?._id

    const dispatch = useDispatch()

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description, id }, { withCredentials: true })

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(getRefresh())
                setDescription("")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error")
        }
    }

    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className='flex justify-between items-center border border-b-gray-100 border-t-0 border-l-0 border-r-0'>
                    <div className='hover:bg-gray-200 rounded-sm w-full py-3 text-center'>
                        <h1 className='font-semibold text-lg text-gray-700 cursor-pointer'>For You</h1>
                    </div>
                    <div className='hover:bg-gray-200 rounded-sm w-full py-3 text-center'>
                        <h1 className='font-semibold text-lg text-gray-700 cursor-pointer'>Following</h1>
                    </div>
                </div>
            </div>


            <div className='mt-5 mb-4'>
                <div className='border border-b-gray-200 border-l-0 border-r-0 border-t-0'>
                    <div className='flex items-center px-10'>
                        <div>
                            <Avatar src={vipin} size="45" round={true} />
                        </div>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none border-none ml-3 text-xl w-full' type="text" placeholder='What is happening?' />
                    </div>
                    <div className='w-full flex justify-end mt-5 mb-5 px-10'>
                        <button onClick={submitHandler} className='px-3 py-2 text-center text-lg outline-none border-none rounded-full bg-[#1D9BF0] text-white w-20'>Post</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CreatePost