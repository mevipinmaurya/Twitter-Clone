import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/TweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet)

    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`, {
                withCredentials: true
            })
            // console.log(res)
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error)
        }
    }


    const followingTweetHandler = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/followingtweets/${id}`, { withCredentials: true })

            // console.log(res)
            dispatch(getAllTweets(res.data.tweets))
        } catch (error) {
            // console.log(error)
            toast.error("Error")
        }
    }

    useEffect(() => {
        if (isActive) {
            fetchMyTweets()
        } else {
            followingTweetHandler()
        }
    }, [refresh, isActive])
}

export default useGetMyTweets;