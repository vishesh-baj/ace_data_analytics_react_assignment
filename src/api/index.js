import axios from "axios";
import { DISHES_API_ENDPOINT } from "../constants";

export const fetchAllDishes = async () => {
  const response = await axios.get(DISHES_API_ENDPOINT);
  return response.data;
};
