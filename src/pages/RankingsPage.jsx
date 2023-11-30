import { useQuery } from "react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import Collapse from "../components/UI/Collapse";

const RankingsPage = () => {
  const userEmail = localStorage.getItem("userEmail");

  const userQueryKey = ["userData", userEmail];

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery(userQueryKey, async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/users?email=${userEmail}`
    );
    return response.data[0];
  });

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error: {userError}</div>;
  }

  return (
    <div className="p-4">
      <h1>User's Dish Rankings in Descending Order</h1>
      <div className="flex flex-col px-4 gap-4 mt-4">
        {userData.dishes
          .sort((a, b) => b.Points - a.Points)
          .map((dish) => (
            <Collapse
              key={dish.id}
              dishName={dish.dishName}
              dishDescription={dish.description}
              points={dish.Points}
            />
          ))}
      </div>
    </div>
  );
};

export default RankingsPage;
