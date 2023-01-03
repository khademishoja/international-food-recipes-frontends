import { useState, useEffect } from "react";
// import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, fetchRegions } from "../store/recipe/thunks";
import { selectUser } from "../store/user/selectors";
import { selectRegions } from "../store/recipe/selectors";

export const NewRecipe = () => {
  const [image, setImage] = useState();
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [region, setRegion] = useState("");
  const user = useSelector(selectUser);
  const loadRegion = useSelector(selectRegions);
  const dispatch = useDispatch();
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
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add new food recipe</h1>
      <div>
        food title:
        <textarea
          type="text"
          value={foodName}
          onChange={onFoodNameChange}
        ></textarea>
      </div>

      <input type="file" onChange={uploadImage} />
      <div>
        <img
          style={{ width: 400 }}
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
        />
        <div>
          Description:
          <textarea
            type="text"
            rows="10"
            cols="80"
            value={description}
            onChange={onDescriptionChange}
          ></textarea>
        </div>
        <div>
          Recipe:
          <textarea
            type="text"
            value={recipe}
            onChange={onRecipeChange}
            rows="10"
            cols="80"
          ></textarea>
        </div>
        <div>
          <select id="cars" name="cars" onChange={onRegionChange}>
            {loadRegion.map((item) => {
              return <option value={item.id}>{item.country}</option>;
            })}
          </select>
        </div>
        {/* <input type="text" value={region} onChange={onRegionChange}></input> */}
        {image ? <h4 style={{ fontSize: 20 }}>Succesfully uploaded!</h4> : ""}
      </div>
      <div>
        <button onClick={onPostRecipe}>Post</button>
      </div>
    </div>
  );
};
