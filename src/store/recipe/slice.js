import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  recipeDetails: [],
  regions: [],
  comments: [],
  restaurants: [],
  isFavorite: false,
  commentIsSent: false,
  ingredients: [],
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
    updateIngredients: (state, action) => {
      const updatedObj = {
        title: action.payload.title,
        unit: action.payload.unit,
        amount: action.payload.amount,
      };
      state.ingredients = [
        ...state.ingredients.slice(0, action.payload.index),
        updatedObj,
        ...state.ingredients.slice(action.payload.index + 1),
      ];
    },
    addIngrediente: (state, action) => {
      //debugger;
      //state.ingredients = [...state.ingredients, action.payload];
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
  updateIngredients,
  addIngrediente,
} = recipeSlice.actions;

export default recipeSlice.reducer;
