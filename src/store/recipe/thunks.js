import {
  setAllRecipes,
  setRecipeDetails,
  setRegions,
  setComments,
  setRestaurant,
  setIsFavorite,
  updateRecipeLikeCount,
  toggleCommentIsSent,
  toggleBackToHome,
} from "./slice";
import axios from "axios";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

export const fetchRecipes = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://localhost:4000/`);
    dispatch(setAllRecipes(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const fetchDetailsRecipes = (recipeId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/recipe/${recipeId.id}`
    );
    dispatch(setRecipeDetails(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const postRecipe = (recipe) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const res = await axios.post("http://localhost:4000/newrecipe", recipe, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
export const fetchRegions = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/newrecipe/");
    dispatch(setRegions(res.data));

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
export const fetchComments = (recipeId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/comments/${recipeId.id}`
    );

    console.log(response.data);
    dispatch(setComments(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const postComment = (comments) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const res = await axios.post(`http://localhost:4000/comments/`, comments, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(comments.recipeId);
    const id = { id: comments.recipeId };
    dispatch(fetchComments(id));
    dispatch(toggleCommentIsSent(true));
    console.log(res);
  } catch (e) {
    console.log(e.message);
  }
};
export const toggleLike = (item) => async (dispatch, getstate) => {
  try {
    const { token } = getstate().user;

    const response = await axios.put(
      `http://localhost:4000/recipe`,
      { id: item.id, like: item.like },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(setIsFavorite(item.like));
      dispatch(updateRecipeLikeCount(response.data.likes));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchRestaurants = (recipeId) => async (dispatch, getState) => {
  try {
    // debugger;
    const response = await axios.get(
      `http://localhost:4000/restaurant/${recipeId.id}`
    );
    console.log("jaksdhak");
    console.log(response.data);
    dispatch(setRestaurant(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const fetchFavorite = (recipeId) => async (dispatch, getState) => {
  try {
    // debugger;
    const { token } = getState().user;
    const response = await axios.get(
      `http://localhost:4000/favorite/${recipeId.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    dispatch(setIsFavorite(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
