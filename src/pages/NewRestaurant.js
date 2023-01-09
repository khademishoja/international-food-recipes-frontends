import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MapSelectArea from "../components/MapSelectArea";
import { selectRestaurantLocation } from "../store/restaurant/selector";
import { postRestaurant } from "../store/restaurant/thunks";
export const NewRestaurant = () => {
  const id = useParams();
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const location = useSelector(selectRestaurantLocation);
  const dispatch = useDispatch();

  const onNameChange = (e) => {
    setName(e.target.value);
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
  const onPost = () => {
    const obj = {
      recipeId: id.id,
      name: name,
      longitude: location.longitude,
      latitude: location.latitude,
      userId: null,
      imageUrl: image,
    };
    dispatch(postRestaurant(obj));
    console.log(obj);
  };
  return (
    <div className="container">
      <form action="/">
        <div className="row">
          <div className="row">
            <h2>New restaurant:</h2>
          </div>
          <div className="col col-sm-4">
            <img
              className="img-thumbnail file-input-img"
              alt="attachment"
              src={
                image
                  ? image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
            />
          </div>
          <div className="form-group col col-sm-8">
            <div className="row">
              <input
                type={"text"}
                id="title"
                className="form-control recipe-input"
                placeholder="Title"
                value={name}
                onChange={onNameChange}
              ></input>
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
              <MapSelectArea />
            </div>
          </div>
        </div>
        <div className="row ">
          {image ? <h4 style={{ fontSize: 20 }}>Succesfully uploaded!</h4> : ""}
          <div className="text-center">
            <button style={{ margin: 10 }} className="btn " onClick={onPost}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
