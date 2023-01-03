import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import recipeReducer from "./recipe/slice";
import restaurantReducer from "./restaurant/slice";
export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    recipe: recipeReducer,
    restaurant: restaurantReducer,
  },
});
