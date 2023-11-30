import { useQuery } from "react-query";
import { fetchAllDishes } from "../api";
import { useEffect, useState } from "react";
const AllDishesPage = () => {
  const { data, isLoading, error } = useQuery("dishes_data", fetchAllDishes, {
    staleTime: 100000,
  });

  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    if (showModal) {
      document.getElementById("all_dishes_modal").showModal();
    }
  };
  const handleDishSelection = (dish) => {
    console.log("SLECTED DISH: ", dish);
    if (selectedDishes.length >= 3) {
      setShowModal(true);
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
    document.getElementById("all_dishes_modal").close();
    setShowModal(false);
  };

  useEffect(() => {
    console.log("SLECTED DISHES: ", selectedDishes);
  }, [selectedDishes]);

  useEffect(() => {
    handleToggleModal();
  }, [showModal]);

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

      <dialog id="all_dishes_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ops!</h3>
          <p className="py-4">
            You cannot rank more than three dishes at a time
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
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
