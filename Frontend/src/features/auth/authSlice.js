import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async () => {
        const res = await axiosInstance.get("/auth/checkauth");
        console.log(res.data)
        return res.data
    }
);


const initialState = {
    authUser: null,
    isCheckingAuth: false,
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckingAuth = false;
                state.authUser = action.payload;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isCheckingAuth = false;
                state.authUser = null;
                state.error = action.error.message;
            });
    }

})

export default authSlice.reducer
