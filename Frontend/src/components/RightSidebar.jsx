import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar'
import vipin from "../assets/vipin.png"


const RightSidebar = () => {
  return (
    <div className='w-[26%] ml-2'>
      <div className="w-full">
        <div className='w-full p-2 bg-gray-100 rounded-full outline-none flex items-center'>
          <span className='text-lg text-gray-600'><CiSearch /></span>
          <input type="text" className='bg-transparent outline-none border-none ml-2' placeholder='Search' />
        </div>

        <div className='mt-7 p-4 bg-gray-100 w-full rounded-xl'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold'>Who To Follow</h1>

            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                <Avatar src={vipin} size="35" round={true} />
                <div className='flex flex-col'>
                  <h1 className='font-semibold text-[15px]'>Vipin</h1>
                  <p className='text-[13px] text-gray-500 '>@mevipinmaurya</p>
                </div>
              </div>
              <div className='w-full flex justify-end mt-5 mb-5'>
                <button className='px-2 py-2 text-center text-[13px] outline-none border-none rounded-full bg-black text-white w-20'>Profile</button>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                <Avatar src={vipin} size="35" round={true} />
                <div className='flex flex-col'>
                  <h1 className='font-semibold text-[15px]'>Vipin</h1>
                  <p className='text-[13px] text-gray-500 '>@mevipinmaurya</p>
                </div>
              </div>
              <div className='w-full flex justify-end mt-5 mb-5'>
                <button className='px-2 py-2 text-center text-[13px] outline-none border-none rounded-full bg-black text-white w-20'>Profile</button>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                <Avatar src={vipin} size="35" round={true} />
                <div className='flex flex-col'>
                  <h1 className='font-semibold text-[15px]'>Vipin</h1>
                  <p className='text-[13px] text-gray-500 '>@mevipinmaurya</p>
                </div>
              </div>
              <div className='w-full flex justify-end mt-5 mb-5'>
                <button className='px-2 py-2 text-center text-[13px] outline-none border-none rounded-full bg-black text-white w-20'>Profile</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar