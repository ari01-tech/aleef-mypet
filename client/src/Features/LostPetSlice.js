import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  pets: [],
};

export const getLostPets = createAsyncThunk("lost/get", async () => {
  const res = await axios.get(`${API_URL}/getLostPets`);
  return res.data.pets;
});

export const addLostPet = createAsyncThunk("lost/add", async (data) => {
  const res = await axios.post(`${API_URL}/reportLostPet`, data);
  return res.data.pet;
});

const slice = createSlice({
  name: "lost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLostPets.fulfilled, (state, action) => {
        state.pets = action.payload;
      })
      .addCase(addLostPet.fulfilled, (state, action) => {
        state.pets.unshift(action.payload);
      });
  },
});

export default slice.reducer;