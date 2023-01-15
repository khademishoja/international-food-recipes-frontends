import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants } from "../store/recipe/selectors";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import React from "react";
import { TfiHandPointDown } from "react-icons/tfi";
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
            <div className="col-sm-6">
              <div>
                <p>{recipeDetails.description}</p>
              </div>
              <div className="like">
                <p>
                  {user ? (
                    <div>
                      {isFavorite ? (
                        <AiFillHeart size={30} onClick={onDisLikeClick} />
                      ) : (
                        <AiOutlineHeart size={30} onClick={onLikeClick} />
                      )}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <AiOutlineHeart
                        size={30}
                        onClick={function () {
                          alert("please log in");
                        }}
                      />
                    </div>
                  )}
                  {likes} people like {recipeDetails.foodName}
                </p>
              </div>
            </div>
          </div>

          <div className="txtcont">
            {/* <div className="detailsDes">
              <h4>{recipeDetails.description}</h4>
            </div> */}
            <div className="detailsTxt">
              <p>{recipeDetails.recipe}</p>
            </div>
          </div>
          <div></div>
        </div>

        {/* <NavLink to={`/addrestaurant/${id.id}`} className="detailsLink">
            Add restaurant
          </NavLink> */}
      </div>

      <div className="row" style={{ width: "100%" }}>
        <RecentComments id={id} />
      </div>
      <p style={{ marginTop: 50, fontSize: 20 }}>
        Here you can see address of some of restaurants which serve{" "}
        {recipeDetails.foodName}
      </p>
      <div
        style={{
          backgroundColor: "rgb(102 37 11)", 
          borderRadius: 3, 
          width: "100%",
          marginTop: 50,
          padding: 50,
        }}
        className="d-flex flex-wrap justify-content-center"
      >
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((items, index) => (
            <div>
              <h4 style={{ margin: 10 }} className="text-center">
                {items.name}
              </h4>
              <Map
                latitude={items.latitude}
                longitude={items.longitude}
                index={index}
                name={items.name}
                imageUrl={items.imageUrl}
              />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>

      <div className="text-center">
        <p style={{ marginTop: 50, fontSize: 20 }}>
          {" "}
          Have you ever tried {recipeDetails.foodName} in a restaurant? Can you
          recommend it?if so go here <TfiHandPointDown />
        </p>
        <a href={`/addrestaurant/${id.id}`} className="btn btn-secondary">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Recomend a restaurrant
        </a>
      </div>

      <div></div>
    </div>
  ) : (
    <p>loading...</p>
  );
};
