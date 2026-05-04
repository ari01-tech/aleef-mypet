import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    return user;
  } catch (error) {
    alert("Invalid credentials");
    throw new Error("Invalid credentials");
  }
});

export const logout = createAsyncThunk("users/logout", async () => {
  await axios.post("http://localhost:3001/logout");
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isSuccess = false;
      });
  },
});

export default userSlice.reducer;