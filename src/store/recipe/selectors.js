export const selectRecipes = (reduxState) => reduxState.recipe.recipes;
export const selectRecipeDetails = (reduxState) =>
  reduxState.recipe.recipeDetails;
export const selectRegions = (reduxState) => reduxState.recipe.regions;
export const selectComments = (reduxState) => reduxState.recipe.comments;
export const selectRestaurants = (reduxState) => reduxState.recipe.restaurants;
export const selectIsFavorite = (reduxState) => reduxState.recipe.isFavorite;
