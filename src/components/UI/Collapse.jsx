import PropTypes from "prop-types";

const Collapse = ({ dishName, dishDescription, points }) => {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        <h2 className="font-bold">{dishName}</h2>
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        <h3 className="font-semibold">Description</h3>
        <p>{dishDescription}</p>
        <div className="divider divider-primary"></div>
        <h3 className="font-semibold">Points</h3>
        <span>Dish Points: {points}</span>
      </div>
    </div>
  );
};

Collapse.propTypes = {
  dishName: PropTypes.string.isRequired,
  dishDescription: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

export default Collapse;
