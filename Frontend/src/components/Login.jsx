import React, { useState } from 'react'
import twitter from "../assets/twitter.png"
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/Constant';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name, username, email, password);
    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, {
          email, password
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      //signup
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, {
          name, username, email, password
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  }


  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5' width={"300px"} src={twitter} alt="twitter-logo" />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Signup"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
            {
              !isLogin && (<>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
              </>)
            }

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />


            <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login