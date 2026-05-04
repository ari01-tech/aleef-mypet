import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pets: [],
  pet: {},
  status: "",
  error: "",
};

export const addPet = createAsyncThunk("pets/addPet", async (petData) => {
  const response = await axios.post("http://localhost:3001/addPet", petData);
  return response.data.pet;
});

export const getPets = createAsyncThunk("pets/getPets", async () => {
  const response = await axios.get("http://localhost:3001/getPets");
  return response.data.pets;
});

export const getPet = createAsyncThunk("pets/getPet", async (id) => {
  const response = await axios.get(`http://localhost:3001/getPet/${id}`);
  return response.data.pet;
});

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (!state.pets) {
          state.pets = [];
        }

        if (action.payload) {
          state.pets.unshift(action.payload);
        }
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pets = action.payload || [];
      })
      .addCase(getPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPet.fulfilled, (state, action) => {
  state.pet = action.payload;
});
  },
});

export default petSlice.reducer;