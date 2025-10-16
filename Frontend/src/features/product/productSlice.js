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

const initialState = {
  products: [],
  isCreating: false,
  createError: null,
  createMessage: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.createError = null;
      state.createMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
        state.createMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isCreating = false;
        state.products.push(action.payload); // Add to list
        state.createMessage = "Product created successfully!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload || action.error.message;
        state.createMessage = null;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
