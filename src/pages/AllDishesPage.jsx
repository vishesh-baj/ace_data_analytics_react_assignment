import { useQuery } from "react-query";
import { fetchAllDishes } from "../api";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../constants";
import axios from "axios";
const AllDishesPage = () => {
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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {data.map((dish) => (
        <div
          key={dish.id}
          className={`card shadow-xl ${handleCardBackgroundColor(dish)}`}
        >
          <figure>
            <img
              className="object-cover w-full"
              src={dish.image}
              alt={dish.dishName}
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">{dish.dishName}</h2>
            </div>
            <p>{dish.description}</p>
            <div className="card-actions">
              <button
                onClick={() => handleDishSelection(dish)}
                className="btn btn-primary"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      ))}
      {isThreeDishesSelected && (
        <div className="flex justify-center items-center animate-bounce">
          <button
            onClick={handleDishSubmit}
            className="btn btn-secondary w-full"
          >
            Submit
          </button>
        </div>
      )}

      {/* limit modal */}
      <dialog id="all_dishes_limit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ops!</h3>
          <p className="py-4">
            You cannot rank more than three dishes at a time
          </p>
          <div className="modal-action">
            <form method="dialog ">
              <button onClick={resetDishesSelection} className="btn">
                try again
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllDishesPage;
