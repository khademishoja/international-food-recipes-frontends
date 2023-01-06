import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants } from "../store/recipe/selectors";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  fetchDetailsRecipes,
  toggleLike,
  fetchRestaurants,
  fetchFavorite,
} from "../store/recipe/thunks";
import {
  selectRecipeDetails,
  selectIsFavorite,
} from "../store/recipe/selectors";
import { selectUser } from "../store/user/selectors";
import { useParams } from "react-router-dom";
import { RecentComments } from "../components/comments";
import "./style.css";

export const DetailsPage = () => {
  const dispatch = useDispatch();
  const recipeDetails = useSelector(selectRecipeDetails);
  const id = useParams();
  const user = useSelector(selectUser);
  const [likes, setLikes] = useState(0);
  const isFavorite = useSelector(selectIsFavorite);
  const restaurants = useSelector(selectRestaurants);

  useEffect(() => {
    dispatch(fetchDetailsRecipes(id));
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
    <div className="container">
      <h2 className="recipeTitle">{recipeDetails.foodName}</h2>

      <div>
        <div>
          <div className="row">
            <img
              className="img-fluid col-sm-6"
              src={recipeDetails.imageUrl}
              alt="food pic"
            />
            <p className="col-sm-6">{recipeDetails.description}</p>
          </div>

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

        {/* <NavLink to={`/addrestaurant/${id.id}`} className="detailsLink">
            Add restaurant
          </NavLink> */}
      </div>

      <div>
        <RecentComments id={id} />
      </div>

      <div>
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

      <div>
        <a href={`/addrestaurant/${id.id}`} className="btnLink">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Have you ever tried {recipeDetails.foodName} in a restaurant? Can you
          recommend it?
        </a>
      </div>

      <div></div>
    </div>
  ) : (
    <p>loading...</p>
  );
};
