import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
const Sidebar = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li>
        <Link to={PATHS.all_dishes}>Dishes</Link>
      </li>
      <li>
        <Link to={PATHS.rankings}>Rankings</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
