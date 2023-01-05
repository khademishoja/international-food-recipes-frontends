import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  favoriteRestaurant: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
    // setRecipesFavorite:()=>{

    // }
    setRecipesFavorite: (state, action) => {
      state.recipeDetails = action.payload;
    },
  },
});

export const { loginSuccess, logOut, tokenStillValid, setRecipesFavorite } =
  userSlice.actions;

export default userSlice.reducer;
