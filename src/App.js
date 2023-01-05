import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import {
  Homepage,
  Login,
  SignUp,
  NewRecipe,
  NewRestaurant,
  MyFavoriteRecipe,
} from "./pages";
import { DetailsPage } from "./pages/Detailspage";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      {/* <Navbar /> */}
      <Navigation />

      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:id" element={<DetailsPage />} />
        <Route path="/addrecipe" element={<NewRecipe />} />
        <Route path="/addrestaurant/:id" element={<NewRestaurant />} />
        <Route path="/favoriterecipe" element={<MyFavoriteRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
