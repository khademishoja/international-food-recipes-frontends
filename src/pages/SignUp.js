import styled from "styled-components"
import { Button, Input, Title } from "../styled"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signUp } from "../store/user/thunks"
import { selectToken } from "../store/user/selectors"

export const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(selectToken)

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(signUp(name, email, password,image))
  }
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
  return (
    <div style={{textAlign: "center"}}>
      <Container>
        <Title>Sign Up</Title>
        <form onSubmit={submitForm}>
          <Input 
            placeholder="name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          <br/>
          <Input 
            placeholder="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>
          <Input 
            type="password" 
            placeholder="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <label for="formFileSm" class="form-label">You can upload your profile image here</label>
          <br/>
          <input type="file" class="form-control" form-control-sm
           id="formFileSm"
            onChange={uploadImage} />
          <br/> 
          <Button type="submit">Sign Up</Button>
        </form>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`