// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";


// Check authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      return res.data; // { user } expected from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Auth check failed"
      );
    }
  }
);

// Signup
export const signinUser = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/signup", credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data; // { user, message } expected from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      return res.data; // { message: "Logged out successfully" }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

const initialState = {
  authUser: null,
  isCheckingAuth: false,
  isSigningIn: false,
  signInError:null,
  signInMessage:null,
  isLoggingIn: false,
  logInError: null,
  logInMessage: null,
  isLoggingOut: false,
  logOutError: null,
  logOutMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.logInError = null;
      state.logInMessage = null;
      state.logOutMessage = null;
      state.logOutError = null;
      state.signInError = null;
      state.signInMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = null;
        state.error = action.payload || action.error.message;
      })

      //Signup
      .addCase(signinUser.pending,(state) =>{
        state.isSigningIn = true;
        state.signInError = null;
        state.signInMessage = null;
      })
      .addCase(signinUser.fulfilled,(state,action)=>{
        state.isSigningIn = false;
        state.authUser = action.payload;
        state.signInMessage = "Signup Successful";
      })
      .addCase(signinUser.rejected,(state,action)=>{
        state.isSigningIn = false;
        state.authUser = null;
        state.signInError = action.payload;
        state.signInMessage = null;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
        state.logInError = null;
        state.logInMessage = null; // reset previous message
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload.user || action.payload;
        state.logInMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = null;
        state.logInError = action.payload || action.error.message;
        state.logInMessage = null; // clear message on error
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoggingOut = true;
        state.logOutMessage = null;
        state.logOutError = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggingOut = false;
        state.authUser = null;
        state.logOutMessage =
          action.payload?.message || "Logged out successfully";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.logOutError = action.payload || action.error.message;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
