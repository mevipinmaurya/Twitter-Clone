import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/TweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store=>store.tweet)
    useEffect(() => {
        const fetchMyTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`, {
                    withCredentials: true
                })
                console.log(res)
                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyTweets()
    }, [refresh])
}

export default useGetMyTweets;