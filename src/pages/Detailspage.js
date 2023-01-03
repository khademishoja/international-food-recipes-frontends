import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants } from "../store/recipe/selectors";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Map from "../components/Map";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
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
    //dispatch(fetchComments(id));
    dispatch(fetchRestaurants(id));
    if (user) {
      dispatch(fetchFavorite(id));
    }
  }, [dispatch, id, user]);
  useEffect(() => {
    if (recipeDetails) setLikes(recipeDetails.likes);
    console.log("is like has changed!");
  }, [recipeDetails, isFavorite]);

  const onCommentChange = (e) => {
    setNewComment(e.target.value);
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
    <div className="detailsContainer">
      <h2 className="recipeTitle">{recipeDetails.foodName}</h2>
      <br />
      <img src={recipeDetails.imageUrl} alt="food pic" className="detailPic" />
      <h4>{recipeDetails.description}</h4>
      <p>{recipeDetails.recipe}</p>
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
        {likes}{" "}
      </p>

      <div>
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((items, index) => (
            <Map
              latitude={items.restaurant.latitude}
              longitude={items.restaurant.longitude}
              index={index}
              name={items.restaurant.name}
              imageUrl={items.restaurant.imageUrl}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <NavLink to={`addrestaurant/${id}`} className="detailsLink">
          Add restaurant
        </NavLink>
      </div>
      {comments ? (
        comments.map((comment, index) => {
          return (
            <div key={index}>
              <Comment text={comment.text}></Comment>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
      <div>
        Comment:
        <textarea
          type="text"
          rows="10"
          cols="80"
          value={newComment}
          onChange={onCommentChange}
        ></textarea>
      </div>
      <div>
        <button onClick={onCommentPost}>Post Comment</button>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
};
