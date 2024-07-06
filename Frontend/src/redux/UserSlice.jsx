import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
        profileRefresh: false,
    },
    reducers: {
        // Multiple actions
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        getMyProfile: (state, action) => {
            state.profile = action.payload
        },
        followingUpdate: (state, action) => {
            if (state.user.following.includes(action.payload)) {
                // unfollow
                state.user.following = state.user.following.filter((itemId) => {
                    return itemId !== action.payload
                })
            } else {
                // follow
                state.user.following.push(action.payload)
            }
        },
        getProfileRefresh: (state) => {
            state.profileRefresh = !state.profileRefresh
        }
    }
})

export const { getUser, getOtherUsers, getMyProfile, followingUpdate, getProfileRefresh } = userSlice.actions;

export default userSlice.reducer;