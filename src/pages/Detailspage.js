import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants } from "../store/recipe/selectors";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Map from "../components/Map";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";
import {
  fetchDetailsRecipes,
  fetchComments,
  postComment,
  toggleLike,
  fetchRestaurants,
  fetchFavorite,
} from "../store/recipe/thunks";
import {
  selectRecipeDetails,
  selectComments,
  selectIsFavorite,
} from "../store/recipe/selectors";
import { selectUser } from "../store/user/selectors";
import { useParams } from "react-router-dom";
import Comment from "../components/comment";
import "./style.css";

export const DetailsPage = () => {
  const dispatch = useDispatch();
  const recipeDetails = useSelector(selectRecipeDetails);
  const comments = useSelector(selectComments);
  const id = useParams();
  const user = useSelector(selectUser);
  const [newComment, setNewComment] = useState();
  const [likes, setLikes] = useState(0);
  const isFavorite = useSelector(selectIsFavorite);
  const restaurants = useSelector(selectRestaurants);

  useEffect(() => {
    dispatch(fetchDetailsRecipes(id));
    setTimeout(() => {
      dispatch(fetchComments(id));
    }, 1);
    setTimeout(() => {
      dispatch(fetchRestaurants(id));
    }, 2);
    if (user) {
      setTimeout(() => {
        dispatch(fetchFavorite(id));
      }, 0.1);
    }
  }, [dispatch, id, user]);
  useEffect(() => {
    if (recipeDetails) setLikes(recipeDetails.likes);
    console.log("is like has changed!");
  }, [recipeDetails, isFavorite]);

  const onCommentChange = (e) => {
    setNewComment(e);
  };
  const onCommentPost = () => {
    dispatch(
      postComment({
        text: newComment,
        recipeId: recipeDetails.id,
        userId: user.id,
      })
    );
  };
  const onLikeClick = () => {
    if (recipeDetails) {
      dispatch(toggleLike({ id: recipeDetails.id, like: true }));
    }
  };
  const onDisLikeClick = () => {
    if (recipeDetails) {
      dispatch(toggleLike({ id: recipeDetails.id, like: false }));
    }
  };
  return recipeDetails ? (
    <div>
      <h2 className="recipeTitle">{recipeDetails.foodName}</h2>

      <div className="detailsContainer">
        <div className="detailCard">
          <img
            src={recipeDetails.imageUrl}
            alt="food pic"
            className="detailPic"
          />
          <div className="txtcont">
            <div className="detailsDes">
              <h4>{recipeDetails.description}</h4>
            </div>
            <div className="detailsTxt">
              <p>{recipeDetails.recipe}</p>
            </div>
            <div className="like">
              <p>
                {user ? (
                  <div>
                    {isFavorite ? (
                      <AiFillHeart onClick={onDisLikeClick} />
                    ) : (
                      <AiOutlineHeart onClick={onLikeClick} />
                    )}
                  </div>
                ) : (
                  <AiOutlineHeart />
                )}
                {likes}
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="restaurantMapContainer">
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((items, index) => (
              <Map
                latitude={items.latitude}
                longitude={items.longitude}
                index={index}
                name={items.name}
                imageUrl={items.imageUrl}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>

        <div className="addResContainer">
          <div className="restxt">
            <p>
              If you have eaten this food in a restaurant, you can recommend it
              to others:
            </p>
          </div>
          <a href={`/addrestaurant/${id.id}`} className="btnLink">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add restaurant
          </a>
        </div>
        <div>
          <div className="commentsCont">
            {comments ? (
              comments.map((comment, index) => {
                return (
                  <div key={index}>
                    <h4></h4> <Comment text={comment.text}></Comment>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div>
          Comment:{" "}
          <ReactQuill
            value={newComment}
            onChange={onCommentChange}
            className="quill"
          ></ReactQuill>
          <div>
            <button onClick={onCommentPost}>Post Comment</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
};
