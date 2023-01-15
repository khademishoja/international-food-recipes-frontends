import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

import "../pages/style.css";
const RecipeCards = ({
  id,
  foodName,
  imageUrl,
  description,
  likes,
}) => {
  return (

    <div className="card recipeCard"  >
      <img src={imageUrl} className="card-img-top recipePics" alt="..." />
      <div className="card-body" >
        <h5 className="card-title foodnameTitle">{foodName}</h5>
        <p className="card-text recipeDes">{description}</p>
        <p className="card-text">❤️{likes}</p>
        <NavLink to={`recipes/${id}`} className="btn btn-primary">Read more</NavLink>
      </div>
    </div>
  );
};
export default RecipeCards;
