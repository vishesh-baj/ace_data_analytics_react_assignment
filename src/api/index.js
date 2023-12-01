import axios from "axios";
import { DISHES_API_ENDPOINT, API_ENDPOINT } from "../constants";

export const fetchAllDishes = async () => {
  const response = await axios.get(DISHES_API_ENDPOINT);
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await axios.get(`${API_ENDPOINT}/users`);
  return response.data;
};

export const deleteDish = async (userId, dishId) => {
  await axios.delete(`${API_ENDPOINT}/users/${userId}/dishes/${dishId}`);
};

export const editDish = async (userId, dishId, updatedDish) => {
  await axios.put(
    `${API_ENDPOINT}/users/${userId}/dishes/${dishId}`,
    updatedDish
  );
};
