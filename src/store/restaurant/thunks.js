import axios from "axios";
import { setLocation } from "./slice";
import { apiUrl } from "../../config/constants";

export const postRestaurant = (restaurant) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const res = await axios.post(`${apiUrl}/restaurant/`, restaurant, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
