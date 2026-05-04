import { configureStore } from "@reduxjs/toolkit";
import lostReducer from "../Features/LostPetSlice";
import petsReducer from "../Features/PetSlice";
import usersReducer from "../Features/UserSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    pets: petsReducer,
    lost: lostReducer,
  },
});
