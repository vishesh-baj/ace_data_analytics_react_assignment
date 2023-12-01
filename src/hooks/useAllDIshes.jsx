import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../constants";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchAllDishes } from "../api";
import useSwal from "./useSwal";
const useAllDishesh = () => {
  const swal = useSwal();
  const { data, isLoading, error } = useQuery("dishes_data", fetchAllDishes, {
    staleTime: 100000,
  });

  const [selectedDishes, setSelectedDishes] = useState([]);
  const [limitShowModal, setLimitShowModal] = useState(false);

  const isThreeDishesSelected = selectedDishes.length === 3;

  const handleLimitShowModal = () => {
    if (limitShowModal) {
      document.getElementById("all_dishes_limit_modal").showModal();
    }
  };

  const handleDishSelection = (dish) => {
    console.log("SLECTED DISH: ", dish);

    if (selectedDishes.length >= 3) {
      setLimitShowModal(true);
    } else {
      selectedDishes.includes(dish)
        ? setSelectedDishes((prevState) =>
            prevState.filter((state_dish) => state_dish !== dish)
          )
        : setSelectedDishes((prevState) => [...prevState, dish]);
    }
  };

  const handleCardBackgroundColor = (dish) => {
    if (selectedDishes.includes(dish)) {
      return "bg-base-100";
    } else {
      return "bg-base-300";
    }
  };

  const resetDishesSelection = () => {
    setSelectedDishes([]);
    document.getElementById("all_dishes_limit_modal").close();
    setLimitShowModal(false);
    document.body.scrollTop();
  };

  const handleDishSubmit = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await axios.get(
        `${API_ENDPOINT}/users?email=${userEmail}`
      );
      const userData = response.data;
      const userId = userData[0]?.id;
      const updatedDishes = userData[0]?.dishes.map((existingDish) => {
        const existingIndex = selectedDishes.findIndex(
          (newDish) => newDish.id === existingDish.id
        );
        if (existingIndex !== -1) {
          const points =
            existingDish.Points +
            (existingIndex === 0
              ? 30
              : existingIndex === 1
              ? 20
              : existingIndex === 2
              ? 10
              : 0);
          return { ...existingDish, Points: points };
        }
        return existingDish;
      });
      const newDishes = selectedDishes
        .filter((newDish) =>
          updatedDishes.every((existingDish) => existingDish.id !== newDish.id)
        )
        .map((newDish, index) => {
          const points =
            index === 0 ? 30 : index === 1 ? 20 : index === 2 ? 10 : 0;
          return { ...newDish, Points: points };
        });
      const dishesWithPoints = [...updatedDishes, ...newDishes];
      await axios.patch(`${API_ENDPOINT}/users/${userId}`, {
        dishes: dishesWithPoints,
      });
      swal.showErrorAlert(
        "Rankings Submitted Successfully",
        "Your rankings are saved",
        "success",
        "Go back"
      );
      // Reset selected dishes
      setSelectedDishes([]);
    } catch (error) {
      console.error("Error submitting dishes:", error);
    }
  };

  useEffect(() => {
    handleLimitShowModal();
  }, [limitShowModal]);

  useEffect(() => {
    if (isThreeDishesSelected) {
      document.body.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isThreeDishesSelected]);

  return {
    isLoading,
    error,
    data,
    isThreeDishesSelected,
    handleCardBackgroundColor,
    handleDishSelection,
    handleDishSubmit,
    resetDishesSelection,
  };
};

export default useAllDishesh;
