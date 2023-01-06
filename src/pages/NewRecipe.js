import { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, fetchRegions } from "../store/recipe/thunks";
import { selectUser } from "../store/user/selectors";
import { selectRegions , selectBackToHome} from "../store/recipe/selectors";
import { useNavigate } from "react-router-dom"

export const NewRecipe = () => {
  const [image, setImage] = useState();
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [region, setRegion] = useState("");
  const user = useSelector(selectUser);
  const backToHome = useSelector(selectBackToHome)
  const loadRegion = useSelector(selectRegions);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);
  useEffect(() => {
    debugger;
    if(backToHome===true){
      navigate("/"); 
    }
    
  }, [backToHome]);
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
<div className="row">
<div class="col col-sm-6">
 <img
 className="img-thumbnail"
    style={{ width: 400 }}
    src={
      image
        ? image
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
    }
  />
 </div>
<div class="col col-sm-4">
  <div className="row">
  <input  className="form-control newRecipe-input" type="text"  value={foodName}  onChange={onFoodNameChange} placeholder="Title" aria-label="Name"></input>
  </div>
<div className="row">
    <select  className="form-select newRecipe-input" aria-label="Select the region" id="regions" name="regions" 
    onChange={onRegionChange}>
      {loadRegion.map((item) => {
        return <option value={item.id}>{item.country}</option>;
      })}
    </select>
  </div> 
<div className="row"> 
  <input className="form-control newRecipe-input" type="file" onChange={uploadImage}  id="formFile"></input>
</div>
<div className="row">
<label for="Summmary" class="form-label">Introduction</label>
<textarea className="form-control newRecipe-input" value={description} 
 onChange={onDescriptionChange}
  id="Summmary"   rows="3"></textarea>
</div>
<div className="row">

<label for="recioe" className="form-label">Recipe</label> 
    <textarea id="recioe" className="form-control newRecipe-input"
      type="text"
      value={recipe}
      onChange={onRecipeChange}
      rows="5"
      cols="80"
    ></textarea> 
</div>

<div>
</div>
</div>
</div> 
{image ? <h4 style={{ fontSize: 20 }}>Succesfully uploaded!</h4> : ""}
<div className="row">
  <button   className="btn btn-light" onClick={onPostRecipe}>Post</button>
</div>
 </div>
  );
};
 