// import { Title } from "../styled";
import "./style.css";
// import { LinkWord } from "../styled";
// import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "../store/recipe/thunks";
import { selectRecipes } from "../store/recipe/selectors";
import RecipeCards from "../components/RecipeCards";
export const Homepage = () => {
  const recipes = useSelector(selectRecipes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  if (!recipes) return <div>Loading...</div>;
  return (
    <div>
      <div className="backgroundPage">
        <h1 className="bgTitle">International food recipes</h1>
      </div>
      <div className="foodTile">
        <h2>Foods</h2>
      </div>
      <div className="container">
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
