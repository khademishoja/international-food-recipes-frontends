import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {},
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = restaurantSlice.actions;

export default restaurantSlice.reducer;
