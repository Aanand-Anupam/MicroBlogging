import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    userPosts: [],
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setAllPosts(state, action) {
            state.allPosts = action.payload.allPosts;
        },
        setUserPosts(state, action) {
            state.userPosts = action.payload.userPosts;
        },
        addPost(state, action) {
            state.allPosts.unshift(action.payload.post);
            state.userPosts.unshift(action.payload.post);
        },
        removePost(state, action) {
            const postId = action.payload.postId;
            state.allPosts = state.allPosts.filter(post => post.postId !== postId);
            state.userPosts = state.userPosts.filter(post => post.postId !== postId);
        },
        updatePosts(state, action) {
            const { postId, post } = action.payload;
            state.allPosts = state.allPosts.map((p) => postId === p.postId ? post : p);
            state.userPosts = state.userPosts.map((p) => postId === p.postId ? post : p);
        }
    }
})

export const { setAllPosts, setUserPosts, addPost, removePost, updatePosts } = postSlice.actions;
export default postSlice.reducer;