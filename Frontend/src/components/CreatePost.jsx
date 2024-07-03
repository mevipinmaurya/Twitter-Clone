import React from 'react'
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"

const CreatePost = () => {
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
                        <input className='outline-none border-none ml-3 text-xl w-full' type="text" placeholder='What is happening?' />
                    </div>
                    <div className='w-full flex justify-end mt-5 mb-5 px-10'>
                        <button className='px-3 py-2 text-center text-lg outline-none border-none rounded-full bg-[#1D9BF0] text-white w-20'>Post</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CreatePost