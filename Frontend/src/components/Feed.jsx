import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'
import store from '../redux/Store'

const Feed = () => {

  const {tweets} = useSelector(store => store.tweet)
  console.log(tweets)

  return (
    <div className='w-[54%]'>
      <div className='w-full border border-gray-100'>
        <CreatePost />
        {
          tweets?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
        }

        {/* <Tweet /> */}
      </div>
    </div>
  )
}

export default Feed