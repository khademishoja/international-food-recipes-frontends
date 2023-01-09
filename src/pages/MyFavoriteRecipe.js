import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFavoriteRestaurant } from "../store/user/thunks";
import { selectFavoiteRestaurant } from "../store/user/selectors";
import RecipeCards from "../components/RecipeCards";

export const MyFavoriteRecipe = () => {
  const favoriteRestaurant = useSelector(selectFavoiteRestaurant);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteRestaurant());
  }, [dispatch]);
  if (!favoriteRestaurant) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-center text-secondary">My Favorite Recipes </h1>

      <div className="container">
        <div className="recipeContainer">
          {favoriteRestaurant && favoriteRestaurant.length > 0 ? (
            favoriteRestaurant.map((recipe, index) => {
              return (
                <div key={index}>
                  <RecipeCards
                    id={recipe.recipe.id}
                    foodName={recipe.recipe.foodName}
                    imageUrl={recipe.recipe.imageUrl}
                    description={recipe.recipe.description}
                    likes={recipe.recipe.likes}
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
