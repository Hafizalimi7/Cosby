import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url } from "./api";;


const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {//when making a request to the backend
      return {...state, registerStatus: "pending"}
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {//when got data from backend
      if(action.payload){

        const user = jwtDecode(action.payload)//stores data

        return{
          ...state, 
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user.id,
          registerStatus: "success"
        }
      }else return state
    });
    builder.addCase(registerUser.rejected, (state, action) => {//when error occcurs
      return {
        ...state, 
        registerStatus: "reject",
        registerError: action.payload,
      }
    });
  },
})

export default authSlice.reducer