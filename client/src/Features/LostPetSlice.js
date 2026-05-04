import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pets: [],
};

export const getLostPets = createAsyncThunk("lost/get", async () => {
  const res = await axios.get("http://localhost:3001/getLostPets");
  return res.data.pets;
});

export const addLostPet = createAsyncThunk("lost/add", async (data) => {
  const res = await axios.post("http://localhost:3001/reportLostPet", data);
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