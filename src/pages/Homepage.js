// import { Title } from "../styled";
import "./style.css";
// import { LinkWord } from "../styled";
// import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "../store/recipe/thunks";
import { selectRecipes } from "../store/recipe/selectors";
import RecipeCards from "../components/RecipeCards";
import { toggleBackToHome } from "../store/recipe/slice";
export const Homepage = () => {
  const recipes = useSelector(selectRecipes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(toggleBackToHome(false));
  }, [dispatch]);
  if (!recipes) return <div>Loading...</div>;
  return (
    // <div className="container">
    <div>
      <div className="backgroundPage">
        <h1 className="bgTitle">International food recipes</h1>
      </div>
      <div className="foodTile">
        <h2>Foods</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="recipeContainer">
          {recipes.map((recipe, index) => {
            return (
              <div key={index}>
                <RecipeCards
                  id={recipe.id}
                  foodName={recipe.foodName}
                  imageUrl={recipe.imageUrl}
                  description={recipe.description}
                  likes={recipe.likes}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
