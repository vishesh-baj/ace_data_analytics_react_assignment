import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../constants";
import useSwal from "./useSwal";
const useAllUsers = () => {
  const swal = useSwal();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/users`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  const deleteDish = async (userId, dishId) => {
    try {
      const updatedUser = data.find((user) => user.id === userId);

      if (updatedUser) {
        updatedUser.dishes = updatedUser.dishes.filter(
          (dish) => dish.id !== dishId
        );
        await axios.put(`${API_ENDPOINT}/users/${userId}`, updatedUser);
        swal.showErrorAlert(
          "Dish Deleted Successfully",
          `dish with id ${dishId} is deleted from database`,
          "success",
          "Go Back"
        );
        refetchData();
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error deleting dish", error);
    }
  };

  const editDish = async (userId, dishId, updatedDish) => {
    try {
      const updatedUser = data.find((user) => user.id === userId);

      if (updatedUser) {
        const updatedDishIndex = updatedUser.dishes.findIndex(
          (dish) => dish.id === dishId
        );

        if (updatedDishIndex !== -1) {
          updatedUser.dishes[updatedDishIndex] = {
            ...updatedUser.dishes[updatedDishIndex],
            ...updatedDish,
          };
          await axios.put(`${API_ENDPOINT}/users/${userId}`, updatedUser);
          swal.showErrorAlert(
            "Dish Edited Successfully",
            "Your dish is edited",
            "success",
            "Go Back"
          );
          refetchData();
          setEditDishData({
            userId: null,
            dishId: null,
            updatedDish: {},
          });
        } else {
          console.error("Dish not found within the user's dishes array");
        }
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error editing dish", error);
    }
  };

  const [editDishData, setEditDishData] = useState({
    userId: null,
    dishId: null,
    updatedDish: {},
  });

  const handleDelete = (userId, dishId) => {
    deleteDish(userId, dishId);
  };

  const handleEdit = (userId, dish) => {
    setEditDishData({
      userId,
      dishId: dish.id,
      updatedDish: { ...dish },
    });
    document.body.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleUpdate = () => {
    const { userId, dishId, updatedDish } = editDishData;
    editDish(userId, dishId, updatedDish);
  };
  return {
    isLoading,
    error,
    data,
    editDishData,
    handleDelete,
    handleEdit,
    setEditDishData,
    handleUpdate,
  };
};

export default useAllUsers;
