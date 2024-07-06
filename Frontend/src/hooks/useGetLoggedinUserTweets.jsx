import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnlyLoggedinUserTweets } from "../redux/TweetSlice";

const useGetLoggedinUserTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet)


    useEffect(() => {
        const loggedinUserTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/getmytweets/${id}`, { withCredentials: true })
                // console.log(res)
                dispatch(getOnlyLoggedinUserTweets(res.data.tweets))
            } catch (error) {
                console.log(error)
                toast.error("Error")
            }
        }
        loggedinUserTweets();
    }, [refresh, id])
}

export default useGetLoggedinUserTweets;