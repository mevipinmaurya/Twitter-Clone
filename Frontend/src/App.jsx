import React from 'react'
import Body from './components/Body'
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <div className='dark:text-white dark:bg-black '>
      <Body />
      <Toaster />
    </div>
  )
}

export default App