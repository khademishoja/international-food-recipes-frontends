import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MapSelectArea from "../components/MapSelectArea";
import { selectRestaurantLocation } from "../store/restaurant/selector";

export const NewRestaurant = () => {
  const id = useParams();
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const location = useSelector(selectRestaurantLocation);
  useEffect(() => {});
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
    // dispatch(
    //   postRestaurant({
    //   })
    // );
    console.log({
      name: name,
      longitude: location.longitude,
      latitude: location.latitude,
    });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Do you know a good resturant which has this dish?</h1>
      <div>
        title:
        <textarea type="text" value={name} onChange={onNameChange}></textarea>
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
        {image ? <h4 style={{ fontSize: 20 }}>Succesfully uploaded!</h4> : ""}
      </div>
      <div>
        <MapSelectArea />
      </div>
      <div>
        <button onClick={onPost}>Post</button>
      </div>
    </div>
  );
};
