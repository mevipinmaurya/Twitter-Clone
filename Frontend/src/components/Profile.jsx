import React from 'react'
import cover from "../assets/cover.png"
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"

const Profile = () => {
    return (
        <div className='w-[54%]'>
            <div className='w-full'>
                <div className='flex items-center py-3 border-l border-r border-gray-100'>
                    <Link to={"/"} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoArrowBackOutline size="24px" />
                    </Link>
                    <div className='ml-1'>
                        <h1 className='font-bold text-lg'>Vipin</h1>
                        <p className='text-gray-500 text-sm'>10 Posts</p>
                    </div>
                </div>
                <div className='relative'>
                    <img className='h-[200px] w-full' src={cover} alt="" />

                    <div className='absolute top-[134px] left-3 border-4 border-white rounded-full'>
                        <Avatar src={vipin} size="120" round={true} />
                    </div>

                    <div className='flex justify-end mt-5'>
                        <button className='px-5 py-2 border-[1px] border-black text-md hover:bg-gray-200 rounded-full text-center' >Edit Profile</button>
                    </div>
                </div>
                <div className='m-4'>
                    <h1 className='text-xl font-bold'>Vipin</h1>
                    <p>@mevipinmaurya</p>
                    <div className='text-gray-800 mt-5'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias placeat aliquam error eum libero. Nesciunt officia pariatur ut! Assumenda.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile