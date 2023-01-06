import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  recipeDetails: [],
  regions: [],
  comments: [],
  restaurants: [],
  isFavorite: false,
  commentIsSent: false,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setAllRecipes: (state, action) => {
      state.recipes = [...action.payload];
    },
    setRecipeDetails: (state, action) => {
      state.recipeDetails = action.payload;
    },
    setRegions: (state, action) => {
      state.regions = [...action.payload];
    },
    setComments: (state, action) => {
      // console.log("set");
      // console.log(action.payload);
      state.comments = [...action.payload];
    },
    setRestaurant: (state, action) => {
      state.restaurants = [...action.payload];
    },
    setIsFavorite: (state, action) => {
      state.isFavorite = action.payload;
    },
    updateRecipeLikeCount: (state, action) => {
      state.recipeDetails.likes = action.payload;
    },
    toggleCommentIsSent: (state, action) => {
      state.commentIsSent = action.payload;
    },
    toggleBackToHome: (state, action) => {
      state.backToHome = action.payload;
    },
  },
});

export const {
  setAllRecipes,
  setRecipeDetails,
  setRegions,
  setComments,
  setRestaurant,
  setIsFavorite,
  updateRecipeLikeCount,
  toggleCommentIsSent,
  toggleBackToHome,
} = recipeSlice.actions;

export default recipeSlice.reducer;
