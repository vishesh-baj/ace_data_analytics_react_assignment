import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import useSwal from "../hooks/useSwal";
const AllUsers = () => {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="py-4 text-2xl">Users Data</h1>
      <div className="overflow-x-scroll">
        <table className="table table-xs table-zebra table-fixed bg-base-300  rounded-xl">
          <thead className="bg-base-200 rounded-xl">
            <tr>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Dish Name</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Points</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td className="py-2 px-4">{user.email}</td>
                  <td colSpan={3} className="py-2 px-4 font-bold">
                    Dishes
                  </td>
                </tr>
                {user.dishes.map((dish) => (
                  <tr key={dish.id}>
                    <td className="py-2 px-4"></td>
                    <td className="py-2 px-4">{dish.dishName}</td>
                    <td className="py-2 px-4">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          className=""
                          src={dish.image}
                          alt={dish.dishName}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">{dish.description}</td>
                    <td className="py-2 px-4">{dish.Points}</td>
                    <td className="py-2 px-4 md:flex md:gap-4">
                      <button
                        onClick={() => handleDelete(user.id, dish.id)}
                        className="btn btn-ghost"
                      >
                        <AiOutlineDelete className="w-5 h-5 text-rose-400" />
                      </button>
                      <button
                        onClick={() => handleEdit(user.id, dish)}
                        className="btn btn-ghost"
                      >
                        <FiEdit2 className="w-5 h-5 text-teal-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {editDishData.userId && editDishData.dishId && (
        <div className="card bg-base-300 mt-4 p-4">
          <h2 className="text-xl">Edit Dish</h2>
          <br />
          <form>
            <div className="flex flex-col">
              <label>Dish Name:</label>
              <input
                className="input input-primary"
                type="text"
                value={editDishData.updatedDish.dishName}
                onChange={(e) =>
                  setEditDishData({
                    ...editDishData,
                    updatedDish: {
                      ...editDishData.updatedDish,
                      dishName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col mt-4">
              <label>Description:</label>
              <textarea
                className="textarea textarea-primary"
                value={editDishData.updatedDish.description}
                onChange={(e) =>
                  setEditDishData({
                    ...editDishData,
                    updatedDish: {
                      ...editDishData.updatedDish,
                      description: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="flex flex-col mt-4">
              <label>Points:</label>
              <input
                className="input input-primary"
                type="number"
                value={editDishData.updatedDish.Points}
                onChange={(e) =>
                  setEditDishData({
                    ...editDishData,
                    updatedDish: {
                      ...editDishData.updatedDish,
                      Points: e.target.value,
                    },
                  })
                }
              />
            </div>
            <button
              className="btn btn-secondary btn-wide mt-4"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
