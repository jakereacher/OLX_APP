import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/product/", productData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Product creation failed");
    }
  }
);

export const fetchMyAds = createAsyncThunk(
  "product/fetchMyAds",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/product/myads");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch your ads"
      );
    }
  }
);

const initialState = {
  products: [],
  isCreating: false,
  createError: null,
  createMessage: null,
  myAds: [],
  isLoadingMyAds: false,
  myAdsError: null,
  myAdsMessage: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.createError = null;
      state.createMessage = null;
      state.myAdsError = null;
      state.myAdsMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
        state.createMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isCreating = false;
        state.products.push(action.payload);
        state.createMessage = "Product created successfully!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload || action.error.message;
        state.createMessage = null;
      })
      .addCase(fetchMyAds.pending, (state) => {
        state.isLoadingMyAds = true;
        state.myAdsError = null;
        state.myAdsMessage = null;
      })
      .addCase(fetchMyAds.fulfilled, (state, action) => {
        state.isLoadingMyAds = false;
        state.myAds = action.payload;
        state.myAdsMessage = "Fetched your ads!";
      })
      .addCase(fetchMyAds.rejected, (state, action) => {
        state.isLoadingMyAds = false;
        state.myAdsError = action.payload || action.error.message;
        state.myAdsMessage = null;
      });
  },
});

export const { clearProductError,} = productSlice.actions;
export default productSlice.reducer;
