import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../pages/style.css";
const RecipeCards = ({
  id,
  foodName,
  recipe,
  imageUrl,
  description,
  likes,
}) => {
  return (
    <div className="recipeCard">
      <h2 className="foodnameTitle">{foodName}</h2>
      <img src={imageUrl} alt="food pic" className="recipePics" />
      <p className="recipeDes">{description}</p>
      <p>❤️ {likes}</p>
      <button class="btn">
        <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
        </svg>{" "}
        <NavLink to={`recipes/${id}`} className="detailsLink">
          Read more
        </NavLink>
      </button>
      {/* <button className="btn">
       
      </button> */}
    </div>
  );
};
export default RecipeCards;
