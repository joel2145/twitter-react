import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uid: "",
      photoURL: "",
      displayName: "",
    },
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", photoURL: "", displayName: "" };
    },
    updateUserProfile: (state, action) => {
      state.user.displayName = action.payload.displayName;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
