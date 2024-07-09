import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/Constant";
import axios from "axios";
import { getRefresh } from "../redux/TweetSlice";
import toast from "react-hot-toast";
import { getProfileRefresh } from "../redux/UserSlice";
import upload_area from "../assets/upload_area.png"

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  const [profileImage, setProfileImage] = useState(false);
  const { user } = useSelector(store => store.user)
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("")

  const id = user?._id

  const dispatch = useDispatch();

  const updateSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username)
    formData.append("bio", bio)
    formData.append("profileImage", profileImage)

    // console.log(formData)
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/updateprofile/${id}`, formData, { withCredentials: true })

      if (res.data.success) {
        toast.success(res.data.message)
        setUsername("")
        setBio("")
        setShowModal(false)
        dispatch(getRefresh())
        dispatch(getProfileRefresh())
      }
    } catch (error) {
      console.log(error)
      toast.error("Error")
    }
  }


  return (
    <>
      <button
        className="px-5 py-2 border-[1px] border-black text-md hover:bg-gray-200 dark:bg-transparent dark:border-white dark:text-white rounded-full text-center"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit Profile
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none border border-[#202327] rounded-md">
            <div className="relative border border-[#4a4d52] rounded-md w-auto md:w-[30%] lg:w-[60%] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-[#202327] dark:border-[#202327] outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit Profile</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-7 w-7 text-2xl flex justify-center items-center bg-[#202327] dark:text-white border border-black dark:border-white py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form onSubmit={updateSubmitHandler} className="bg-gray-200 dark:bg-black shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black dark:text-white text-sm font-medium mb-1">
                      Username
                    </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border border-[#45494f] rounded-md w-full py-2 px-3 text-black dark:text-white bg-transparent mb-3" />
                    <label className="block text-black dark:text-white text-sm font-medium mb-1">
                      Bio
                    </label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="shadow appearance-none border border-[#45494f] h-20 rounded-md w-full resize-none py-2 px-3 text-black dark:text-white bg-transparent mb-3"></textarea>

                    <div className='flex gap-2 flex-col'>
                      <p className="text-lg">Upload Profile Image</p>
                      <label htmlFor="file-input">
                        <img src={profileImage ? URL.createObjectURL(profileImage) : upload_area} alt="file_input" className='w-[160px] cursor-pointer h-[120px]' />
                        {/* <img src={upload_area} alt="Upload_area" /> */}
                      </label>
                      <input onChange={(e) => setProfileImage(e.target.files[0])} type="file" id='file-input' hidden />
                    </div>

                    <div className="flex items-center justify-end p-6 rounded-b">
                      <button
                        className="text-red-500 border-[1px] border-red-500 background-transparent font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      // onClick={() => setShowModal(false)}
                      >
                        Back
                      </button>
                      <button
                        className="text-white bg-[#1D9BF0] active:bg-[#016db5] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      // onClick={() => setShowModal(false)}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;