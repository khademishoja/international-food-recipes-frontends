import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, fetchRegions } from "../store/recipe/thunks";
import { selectUser } from "../store/user/selectors";
import { selectRegions } from "../store/recipe/selectors";
import { useNavigate } from "react-router-dom";
export const NewRecipe = () => {
  const [image, setImage] = useState();
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [region, setRegion] = useState(1);
  const user = useSelector(selectUser);
  const loadRegion = useSelector(selectRegions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const onFoodNameChange = (e) => {
    setFoodName(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onRegionChange = (e) => {
    console.log(e.target.value);
    setRegion(e.target.value);
  };
  const onRecipeChange = (e) => {
    setRecipe(e.target.value);
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "iyfoxclf");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsanefw3u/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setImage(file.url); //put the url in local state, next step you can send it to the backend
  };
  const onPostRecipe = () => {
    dispatch(
      postRecipe({
        foodName: foodName,
        recipe: recipe,
        imageUrl: image,
        description: description,
        regionId: region,
        userId: user.id,
      })
    );
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-sm-6">
          <img
            className="img-thumbnail"
            alt="attachment"
            src={
              image
                ? image
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
          />
        </div>
        <div className="col col-sm-6">
          <div className="row">
            <input
              className="form-control recipe-input"
              type="text"
              value={foodName}
              onChange={onFoodNameChange}
              placeholder="Title"
              aria-label="Name"
            ></input>
          </div>
          <div className="row">
            <select
              className="form-select recipe-input"
              aria-label="Select the region"
              id="regions"
              name="regions"
              onChange={onRegionChange}
            >
              {loadRegion.map((item) => {
                return <option value={item.id}>{item.country}</option>;
              })}
            </select>
          </div>
          <div className="row">
            <input
              className="form-control recipe-input"
              type="file"
              onChange={uploadImage}
              id="formFile"
            ></input>
          </div>
          <div className="row">
            <label for="Summmary" className="form-label">
              Introduction
            </label>
            <textarea
              className="form-control recipe-input"
              value={description}
              onChange={onDescriptionChange}
              id="Summmary"
              rows="3"
            ></textarea>
          </div>
          <div className="row">
            <label for="recioe" className="form-label">
              Recipe
            </label>
            <textarea
              id="recioe"
              className="form-control recipe-input"
              type="text"
              value={recipe}
              onChange={onRecipeChange}
              rows="12"
              cols="80"
            ></textarea>
          </div>

          {image ? <h4 style={{ fontSize: 20 }}>Succesfully uploaded!</h4> : ""}
          <div className="row">
            <button className="btn btn-light" onClick={onPostRecipe}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
