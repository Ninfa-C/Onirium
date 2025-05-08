import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isLoadingProfile: true,
  update: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload;
      state.isLoadingProfile = false;
    },
    logout: (state) => {
      state.profile = null;
    state.isLoadingProfile = false;
    },
    toggleUpdate: (state) => {
      state.update = !state.update;
    },
  },
});

export const { saveProfile, logout, toggleUpdate } = userSlice.actions;
export default userSlice.reducer;
