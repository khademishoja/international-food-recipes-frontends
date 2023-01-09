import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

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
      <div className="recipeCardChilds">
        <h2 className="foodnameTitle">{foodName}</h2>
        <a href={`recipes/${id}`}>
          {" "}
          <img src={imageUrl} alt="food pic" className="recipePics" />
        </a>
        <p className="recipeDes">{description}</p>
        <p>❤️ {likes}</p>
        <a href={`recipes/${id}`} className="btnLink">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Read More
        </a>
        {/* <MDBBtn size="sm" className="me-1">
        <NavLink to={`recipes/${id}`} className="detailsLink">
            Read more
          </NavLink>
        </MDBBtn> */}
        {/* <button className="btn">
          <NavLink to={`recipes/${id}`} className="detailsLink">
            Read more
          </NavLink>
        </button> */}
        {/* <button className="btn">
       
      </button> */}
      </div>
    </div>
  );
};
export default RecipeCards;
