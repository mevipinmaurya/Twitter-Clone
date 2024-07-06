import { createSlice } from '@reduxjs/toolkit'

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
        refresh: false,
        isActive: true,
        myTweets : null,
    },
    reducers: {
        // Multiple actions
        getAllTweets: (state, action) => {
            state.tweets = action.payload
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh
        },
        getIsActive : (state, action)=>{
            state.isActive = action.payload
        },
        getOnlyLoggedinUserTweets : (state, action)=>{
            state.myTweets = action.payload
        }
    }
})

export const { getAllTweets, getRefresh, getIsActive, getOnlyLoggedinUserTweets } = tweetSlice.actions

export default tweetSlice.reducer;