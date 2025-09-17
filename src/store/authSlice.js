import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    status: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.userData = action.payload.userData;
            state.status = action.payload.status;

        },
        logout(state) {
            state.status = false;
            state.userData = null;
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;