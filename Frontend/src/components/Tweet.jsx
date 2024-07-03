import React from 'react'
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"
import { BiCommentDetail } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";


const Tweet = () => {
    return (
        <div>
            <div className='border-b border-gray-200'>
                <div className='flex items-center w-full gap-4 p-4'>
                    <Avatar src={vipin} size="40" round={true} />
                    <div className='w-full'>

                        <div className='flex gap-3 items-center'>
                            <h1 className='font-semibold text-lg'>Vipin</h1>
                            <p className='text-sm text-gray-500 '>@mevipinmaurya. 1min</p>
                        </div>

                        <div>
                            <p className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit Dignissimos.</p>
                        </div>
                    </div>

                </div>

                <div className='w-full p-4'>
                    <div className='flex justify-between w-full mt-4'>
                        <div className='text-2xl items-center cursor-pointer flex'>
                            <div className='p-2 hover:bg-green-100 rounded-full'>
                                <BiCommentDetail />
                            </div>
                            <p className='text-lg'>0</p>
                        </div>
                        <div className='text-2xl items-center cursor-pointer flex'>
                            <div className='p-2 hover:bg-green-100 rounded-full'>
                                <CiHeart />
                            </div>
                            <p className='text-lg'>0</p>
                        </div>
                        <div className='text-2xl items-center cursor-pointer flex'>
                            <div className='p-2 hover:bg-green-100 rounded-full'>
                                <CiBookmark />
                            </div>
                            <p className='text-lg'>0</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Tweet