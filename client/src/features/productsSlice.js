import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  items: [],
  status: null,//start with null in the redux dev kit
  error: null
}

//this is payload creator
export const productsFetch = createAsyncThunk(
  "products/productFetch",//action type
  async () => {
      const response = await axios.get("http://localhost:5000/products")//fetches data from backend
      return response?.data//this stops from throwing a error
    }
)

const productsSlice = createSlice({//contain reducers and actions 
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {//handles action types
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";//status changes to pending
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;//access data from payload(productsFetch)
      console.log(state.items)
      state.status = "success";//when recieved data sucessful
      console.log(state.status)
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";//shows rejected when doesnt get response
    },
  },
});

export default productsSlice.reducer;