import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tweet from './Tweet';
import useGetBookmarkedTweets from '../hooks/useGetBookmarkedTweets';

const Bookmark = () => {

    const { user, bookmarkTweet } = useSelector(store => store.user)
    console.log(bookmarkTweet)

    useGetBookmarkedTweets(user?._id)

    return (
        <div className='w-[54%]'>
            <div className='w-full border-b border-gray-200 '>
                <div className='flex items-center py-3 border-l border-r border-gray-100'>
                    <Link to={"/"} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoArrowBackOutline size="24px" />
                    </Link>
                    <div className='ml-1'>
                        <h1 className='font-bold text-lg'>All Bookmarks</h1>
                        <p className='text-gray-500 text-sm'>{bookmarkTweet.length} Posts</p>
                    </div>
                </div>
            </div>

            <div className="w-full border border-gray-100">
                {
                    bookmarkTweet?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
                }
            </div>

        </div>
    )
}

export default Bookmark