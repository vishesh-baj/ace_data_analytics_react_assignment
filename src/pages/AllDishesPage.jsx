import useAllDishes from "../hooks/useAllDIshes";

const AllDishesPage = () => {
  const {
    data,
    error,
    handleCardBackgroundColor,
    handleDishSelection,
    handleDishSubmit,
    isLoading,
    isThreeDishesSelected,
    resetDishesSelection,
  } = useAllDishes();
  
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
