import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkTweets } from "../redux/UserSlice";
import toast from "react-hot-toast";

const useGetBookmarkedTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet)


    // console.log(id)
    useEffect(() => {
        const bookmarkTweets = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/getbookmark/${id}`, { withCredentials: true })
                console.log(res)
                dispatch(getBookmarkTweets(res.data.tweets))
            } catch (error) {
                console.log(error)
                toast.error("Error")
            }
        }
        bookmarkTweets();
    }, [refresh])
}

export default useGetBookmarkedTweets;