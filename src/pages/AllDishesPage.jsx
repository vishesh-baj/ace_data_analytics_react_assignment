import { useQuery } from "react-query";
import { fetchAllDishes } from "../api";
import { useEffect, useState } from "react";

const AllDishesPage = () => {
  const { data, isLoading, error } = useQuery("dishes_data", fetchAllDishes, {
    staleTime: 100000,
  });

  const [selectedDishes, setSelectedDishes] = useState([]);
  const maxSelectedDishes = 3;

  useEffect(() => {
    console.log("SLECTED DISHES: ", selectedDishes);
  }, [selectedDishes]);

  const handleCheckboxChange = (dish) => {
    if (selectedDishes.includes(dish)) {
      setSelectedDishes((prevSelected) =>
        prevSelected.filter((selected) => selected !== dish)
      );
    } else if (selectedDishes.length < maxSelectedDishes) {
      const dishWithPoint = {
        ...dish,
        Point:
          selectedDishes.length === 0
            ? 30
            : selectedDishes.length === 1
            ? 20
            : 10,
      };
      setSelectedDishes((prevSelected) => [...prevSelected, dishWithPoint]);
    }
  };

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
          className={`card bg-${
            selectedDishes.includes(dish) ? "success" : "base-300"
          } shadow-xl`}
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
              <input
                className="checkbox checkbox-primary"
                type="checkbox"
                onChange={() => handleCheckboxChange(dish)}
                disabled={
                  selectedDishes.length >= maxSelectedDishes &&
                  !selectedDishes.includes(dish)
                }
              />
            </div>
            <p>{dish.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDishesPage;
