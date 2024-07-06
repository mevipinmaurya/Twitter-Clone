import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/UserSlice";

const useGetProfile = (id) => {
    
    const { profileRefresh } = useSelector(store => store.user)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`, {
                    withCredentials: true
                })
                dispatch(getMyProfile(res.data.user));
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyProfile()
    }, [profileRefresh, id])
}

export default useGetProfile;