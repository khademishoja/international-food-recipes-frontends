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
import { apiUrl } from "../../config/constants";

export const fetchRecipes = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}`);
    dispatch(setAllRecipes(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const fetchDetailsRecipes = (recipeId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/recipe/${recipeId.id}`);
    dispatch(setRecipeDetails(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const postRecipe = (recipe) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const res = await axios.post(`${apiUrl}/newrecipe`, recipe, {
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
    const res = await axios.get(`${apiUrl}/newrecipe/`);
    dispatch(setRegions(res.data));

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
export const fetchComments = (recipeId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/comments/${recipeId.id}`);

    console.log(response.data);
    dispatch(setComments(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
export const postComment = (comments) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const res = await axios.post(`${apiUrl}/comments/`, comments, {
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
      `${apiUrl}/recipe`,
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
    const response = await axios.get(`${apiUrl}/restaurant/${recipeId.id}`);
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
    const response = await axios.get(`${apiUrl}/favorite/${recipeId.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    dispatch(setIsFavorite(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
