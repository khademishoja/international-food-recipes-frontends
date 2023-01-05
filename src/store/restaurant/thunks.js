import axios from "axios";
import { setLocation } from "./slice";

export const postRestaurant = (restaurant) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const res = await axios.post(
      `http://localhost:4000/restaurant/`,
      restaurant,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
